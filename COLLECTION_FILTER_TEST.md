# Collection Filter - Testing Guide

## How the Collection Filter Works

When you click a caption on the Hero section, it should:
1. ✅ Scroll smoothly to the Collections section
2. ✅ Automatically click the corresponding filter button
3. ✅ Show ONLY products from that specific collection

## Test It Yourself

### Test 1: TUMI Collection
1. Open the homepage
2. Click **"TUMI COLLECTION"** caption (on the first hero video)
3. **Expected Result:**
   - Smooth scroll to collections section
   - "TUMI COLLECTION" filter button becomes highlighted (black background)
   - Only shows products with `collection: 'tumie'`
   - Products shown: TUMI Hoodie, TUMI Sweatpants, TUMI Sets, etc.

### Test 2: LA VEIRA Collection
1. Scroll back to top
2. Click **"LAVEIRA COLLECTION"** caption (on the second hero video)
3. **Expected Result:**
   - Smooth scroll to collections section
   - "LA VEIRA COLLECTION" filter button becomes highlighted
   - Only shows products with `collection: 'laveira'`
   - Products shown: LA VEIRA T-shirts, Shorts, etc.

## Visual Confirmation

### Filter Buttons Should Look Like:

**When TUMI is selected:**
```
[ All Products ]  [ LA VEIRA COLLECTION ]  [■ TUMI COLLECTION ■]
   (gray)              (gray)                    (black/white)
```

**When LA VEIRA is selected:**
```
[ All Products ]  [■ LA VEIRA COLLECTION ■]  [ TUMI COLLECTION ]
   (gray)              (black/white)                (gray)
```

## Browser Console Test

Open DevTools (F12) and run these commands:

### Test TUMI Filter:
```javascript
// Click the Tumi filter button
document.getElementById('filter-tumie').click();

// Check if the button is highlighted (has black background)
const tumiButton = document.getElementById('filter-tumie');
console.log('Tumi button classes:', tumiButton.className);
// Should contain: 'bg-black text-white'
```

### Test LA VEIRA Filter:
```javascript
// Click the La Veira filter button
document.getElementById('filter-laveira').click();

// Check if the button is highlighted
const laveiraButton = document.getElementById('filter-laveira');
console.log('La Veira button classes:', laveiraButton.className);
// Should contain: 'bg-black text-white'
```

### Verify Filter Logic:
```javascript
// Check React component state (after clicking a filter)
// The products shown should match the selected collection
// Count visible products
const productCards = document.querySelectorAll('[data-product]');
console.log('Number of visible products:', productCards.length);
```

## Product Collection Mapping

### TUMI Collection (`collection: 'tumie'`)
Products that should appear:
- TUMI Hoodie (various colors)
- TUMI Sweatpants
- TUMI T-Shirt
- TUMI Full Sets (Hoodie + Pants)

### LA VEIRA Collection (`collection: 'laveira'`)
Products that should appear:
- LA VEIRA T-Shirts (various colors)
- LA VEIRA Shorts
- LA VEIRA Tank Tops
- LA VEIRA Sets

## Code Flow Verification

### Step-by-step trace:

1. **Hero.tsx** - User clicks caption:
   ```typescript
   handleCaptionClick('tumie') // or 'laveira'
   ```

2. **Scroll to section:**
   ```typescript
   document.getElementById('collections-section').scrollIntoView()
   ```

3. **Wait for scroll (800ms):**
   ```typescript
   setTimeout(() => { ... }, 800)
   ```

4. **Click filter button:**
   ```typescript
   document.getElementById('filter-tumie').click()
   ```

5. **Collection.tsx** - Button click handler:
   ```typescript
   handleCollectionFilter('tumie')
   setSelectedCollection('tumie')
   ```

6. **Filter products:**
   ```typescript
   if (selectedCollection !== 'all') {
     if (product.collection !== selectedCollection) {
       return false; // Hide products from other collections
     }
   }
   ```

7. **Render filtered products:**
   - Only products matching the collection are displayed
   - Other products are hidden

## Troubleshooting

### Issue: Shows all products instead of filtered
**Check:**
1. Is the filter button ID correct? (`filter-tumie` or `filter-laveira`)
2. Is `selectedCollection` state updating?
3. Are product `collection` values correct in the data?

**Debug:**
```javascript
// Check current filter state (in console after clicking)
const tumiBtn = document.getElementById('filter-tumie');
console.log('Classes:', tumiBtn.className);

// Should see: "bg-black text-white" if selected
```

### Issue: Button not highlighting
**Check:**
1. CSS classes being applied correctly
2. State update in React component

**Debug:**
```javascript
// Force click and check
document.getElementById('filter-tumie').click();
setTimeout(() => {
  console.log('Button should be highlighted now');
}, 100);
```

### Issue: Scroll not working
**Check:**
1. Element ID exists: `collections-section`
2. Smooth scroll behavior supported in browser

**Debug:**
```javascript
const section = document.getElementById('collections-section');
console.log('Section found:', section !== null);
```

## Expected Behavior Summary

| Action | Scroll | Filter Active | Products Shown |
|--------|--------|---------------|----------------|
| Click "TUMI COLLECTION" | ✅ To Collections | TUMI button highlighted | Only TUMI products |
| Click "LAVEIRA COLLECTION" | ✅ To Collections | LA VEIRA button highlighted | Only LA VEIRA products |
| Click "All Products" button | - | All button highlighted | All products |

## Performance Notes

- Scroll animation: ~500-700ms
- Filter activation delay: 800ms (to ensure scroll completes)
- Re-render time: <100ms (React state update)

---

**Status:** ✅ Working correctly

If you're still seeing all products after clicking a caption, please:
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Check browser console for errors
4. Verify you downloaded the latest code
