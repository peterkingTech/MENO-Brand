# Navigation Architecture

## ID-Based Navigation System

The application now uses a **direct DOM ID-based navigation system** instead of custom events. This is more reliable, simpler to debug, and works consistently across all environments.

## How It Works

### 1. Hero Caption Click Flow

When a user clicks a collection caption in the Hero component:

```typescript
// Hero.tsx
const handleCaptionClick = (collection: 'tumie' | 'laveira') => {
  // Step 1: Scroll to collections section
  const collectionsSection = document.getElementById('collections-section');
  if (collectionsSection) {
    collectionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Step 2: After scroll completes, trigger filter button
    setTimeout(() => {
      const filterButton = document.getElementById(`filter-${collection}`);
      if (filterButton) {
        filterButton.click(); // Directly click the filter button
      }
    }, 800);
  }
};
```

### 2. Collection Section Structure

```tsx
// App.tsx
<div ref={collectionsRef} id="collections-section">
  <Collection {...props} />
</div>
```

### 3. Filter Buttons with IDs

```tsx
// Collection.tsx
<button
  id="filter-laveira"
  onClick={() => handleCollectionFilter('laveira')}
>
  LA VEIRA COLLECTION
</button>

<button
  id="filter-tumie"
  onClick={() => handleCollectionFilter('tumie')}
>
  TUMI COLLECTION
</button>
```

## Benefits of ID-Based Approach

### ✅ **Advantages:**

1. **No Custom Events** - Eliminates event listener complexity
2. **Direct DOM Access** - Simple `getElementById()` and `.click()`
3. **Browser Compatible** - Works in all browsers without issues
4. **Easy to Debug** - Can test in browser console: `document.getElementById('filter-tumie').click()`
5. **No Props Drilling** - No need to pass callbacks through multiple components
6. **Works Locally** - No dependency on event system that might fail during build

### ❌ **Old Approach (Custom Events):**

```typescript
// Don't use this anymore
window.dispatchEvent(new CustomEvent('filterCollection', {
  detail: { collection }
}));

window.addEventListener('filterCollection', handler);
```

**Problems:**
- Event listeners might not be ready
- Timing issues between components
- Hard to debug
- Can fail in different environments

## Component Communication Map

```
Hero Component (Hero.tsx)
    ↓
    Clicks caption button
    ↓
    getElementById('collections-section')
    ↓
    Scroll to section
    ↓
    getElementById('filter-{collection}')
    ↓
    .click() on filter button
    ↓
Collection Component (Collection.tsx)
    ↓
    handleCollectionFilter() executes
    ↓
    Updates selectedCollection state
    ↓
    Filters products
```

## Key IDs in the Application

| Element | ID | Location |
|---------|-----|----------|
| Collections Section | `collections-section` | App.tsx |
| LA VEIRA Filter | `filter-laveira` | Collection.tsx |
| TUMI Filter | `filter-tumie` | Collection.tsx |

## Testing Navigation

### In Browser Console:

```javascript
// Test scroll to collections
document.getElementById('collections-section').scrollIntoView({
  behavior: 'smooth'
});

// Test filter click
document.getElementById('filter-laveira').click();
document.getElementById('filter-tumie').click();

// Verify elements exist
console.log(document.getElementById('collections-section')); // Should not be null
console.log(document.getElementById('filter-laveira')); // Should not be null
console.log(document.getElementById('filter-tumie')); // Should not be null
```

## Adding New Navigation Targets

To add a new clickable section:

1. **Add ID to target section:**
   ```tsx
   <div id="new-section-id">
     <YourComponent />
   </div>
   ```

2. **Create navigation function:**
   ```typescript
   const navigateToNewSection = () => {
     const section = document.getElementById('new-section-id');
     if (section) {
       section.scrollIntoView({ behavior: 'smooth', block: 'start' });
     }
   };
   ```

3. **Attach to button:**
   ```tsx
   <button onClick={navigateToNewSection}>
     Go to New Section
   </button>
   ```

## Timing Considerations

### Scroll Delay

```typescript
setTimeout(() => {
  const filterButton = document.getElementById(`filter-${collection}`);
  if (filterButton) {
    filterButton.click();
  }
}, 800); // 800ms allows smooth scroll to complete
```

**Why 800ms?**
- Smooth scroll animation takes ~500-700ms
- Extra buffer ensures element is visible
- Prevents clicking before scroll completes

**Adjust if needed:**
- Faster scroll: reduce to 500ms
- Slower devices: increase to 1000ms

## Browser Compatibility

This approach works in all modern browsers:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers
- ✅ IE11 (if needed, with polyfills)

## Debugging Tips

### Element Not Found?

```javascript
// Check if ID exists in DOM
const element = document.getElementById('your-id');
console.log('Element found:', element !== null);
console.log('Element:', element);
```

### Scroll Not Working?

```javascript
// Check if element is scrollable
const element = document.getElementById('collections-section');
console.log('Element height:', element.offsetHeight);
console.log('Element position:', element.getBoundingClientRect());
```

### Click Not Triggering?

```javascript
// Verify button exists and is clickable
const button = document.getElementById('filter-laveira');
console.log('Button found:', button !== null);
console.log('Button disabled:', button.disabled);
button.click(); // Manual test
```

## Performance Notes

- **getElementById** is one of the fastest DOM operations
- No memory leaks (no event listeners to clean up)
- Minimal overhead compared to React state/props
- Works even if React hasn't fully hydrated

## Migration Notes

If you see old custom event code, it can be safely removed:

```typescript
// ❌ Remove these
window.addEventListener('filterCollection', ...);
window.dispatchEvent(new CustomEvent('filterCollection', ...));

// ✅ Use this instead
document.getElementById('filter-tumie').click();
```

---

**Summary:** The ID-based approach is simpler, more reliable, and easier to maintain than custom events.
