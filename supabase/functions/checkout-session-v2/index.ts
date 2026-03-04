import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CheckoutRequest {
  line_items: Array<{
    price: string;
    quantity: number;
  }>;
  success_url: string;
  cancel_url: string;
  customer_email?: string;
  metadata?: Record<string, string>;
  shipping_cost?: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');

    if (!STRIPE_SECRET_KEY) {
      throw new Error('Stripe secret key not configured. Please set STRIPE_SECRET_KEY in Supabase Edge Function secrets.');
    }

    console.log('[V2] Stripe key loaded, last 4 chars:', STRIPE_SECRET_KEY.slice(-4));

    const { line_items, success_url, cancel_url, customer_email, metadata, shipping_cost }: CheckoutRequest = await req.json();

    const allowedCountries = [
      'US', 'CA', 'GB', 'DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'AT', 'CH',
      'PT', 'PL', 'SE', 'NO', 'DK', 'FI', 'IE', 'CZ', 'HU', 'RO', 'BG',
      'HR', 'GR', 'SK', 'SI', 'LT', 'LV', 'EE', 'LU', 'MT', 'CY'
    ];

    const params = new URLSearchParams({
      'mode': 'payment',
      'success_url': success_url,
      'cancel_url': cancel_url,
      'payment_method_types[0]': 'card',
      'billing_address_collection': 'required',
      'locale': 'auto',
      'submit_type': 'pay',
    });

    if (customer_email && customer_email.trim() !== '') {
      params.append('customer_email', customer_email);
    }

    allowedCountries.forEach((country, index) => {
      params.append(`shipping_address_collection[allowed_countries][${index}]`, country);
    });

    line_items.forEach((item, index) => {
      params.append(`line_items[${index}][price]`, item.price);
      params.append(`line_items[${index}][quantity]`, item.quantity.toString());
    });

    if (shipping_cost && shipping_cost > 0) {
      const shippingCostInCents = Math.round(shipping_cost * 100);
      params.append('line_items[' + line_items.length + '][price_data][currency]', 'eur');
      params.append('line_items[' + line_items.length + '][price_data][product_data][name]', 'Shipping');
      params.append('line_items[' + line_items.length + '][price_data][unit_amount]', shippingCostInCents.toString());
      params.append('line_items[' + line_items.length + '][quantity]', '1');
    }

    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        params.append(`metadata[${key}]`, value);
      });
    }

    console.log('[V2] Making request to Stripe API...');

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!stripeResponse.ok) {
      const errorText = await stripeResponse.text();
      console.error('[V2] Stripe API error:', stripeResponse.status, errorText);
      throw new Error(`Stripe API error: ${stripeResponse.status} - ${errorText}`);
    }

    const session = await stripeResponse.json();
    console.log('[V2] Checkout session created successfully');

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );

  } catch (error) {
    console.error('[V2] Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});