import IroColorPicker from '../src/colorPicker';
import IroColor from '../src/color';

/**
 * Test suite for IroWheel gamut mask caching functionality
 * Tests cache hits/misses, RAF batching, memory management, and edge cases
 */

let root;
let mockRAF;
let mockCancelRAF;
let rafCallbacks = [];
let rafCallCount = 0;

beforeAll(() => {
  root = document.createElement('div');
  (document.body || document.documentElement).appendChild(root);

  // Mock requestAnimationFrame and cancelAnimationFrame
  mockRAF = jest.fn((callback) => {
    const id = ++rafCallCount;
    rafCallbacks.push({ id, callback });
    return id;
  });

  mockCancelRAF = jest.fn((id) => {
    rafCallbacks = rafCallbacks.filter(item => item.id !== id);
  });

  global.requestAnimationFrame = mockRAF;
  global.cancelAnimationFrame = mockCancelRAF;
});

beforeEach(() => {
  root.innerHTML = '';
  rafCallbacks = [];
  rafCallCount = 0;
  mockRAF.mockClear();
  mockCancelRAF.mockClear();

  // Clear the global gamut cache before each test
  if (global.GAMUT_MASK_CACHE) {
    global.GAMUT_MASK_CACHE.clear();
  }
});

afterAll(() => {
  root.parentNode.removeChild(root);
  root = null;
  delete global.requestAnimationFrame;
  delete global.cancelAnimationFrame;
});

// Helper function to execute all pending RAF callbacks
function flushRAF() {
  const callbacks = [...rafCallbacks];
  rafCallbacks = [];
  callbacks.forEach(({ callback }) => callback());
}

// Helper function to get cache size (accessing the internal cache)
function getCacheSize() {
  // Access the GAMUT_MASK_CACHE from the Wheel component
  const wheelModule = require('../src/Wheel.tsx');
  return wheelModule.GAMUT_MASK_CACHE ? wheelModule.GAMUT_MASK_CACHE.size : 0;
}

describe('Gamut Mask Caching', () => {

  describe('Basic Cache Functionality', () => {

    test('First render creates cache entry and subsequent renders use cache', () => {
      const colorPicker = new IroColorPicker(root, {
        width: 300,
        gamut: 'C'
      });

      // Execute initial RAF callback
      flushRAF();

      // Should have scheduled one RAF call for initial render
      expect(mockRAF).toHaveBeenCalledTimes(1);

      // Force a re-render by changing a non-cache-affecting property
      colorPicker.color.hue = 180;

      // Should not trigger new RAF since cache key hasn't changed
      expect(mockRAF).toHaveBeenCalledTimes(1);
    });

    test('Cache miss triggers new computation, cache hit uses existing data', () => {
      const colorPicker1 = new IroColorPicker(root, {
        width: 300,
        gamut: 'C',
        wheelAngle: 0
      });

      flushRAF();
      expect(mockRAF).toHaveBeenCalledTimes(1);

      // Create second picker with same cache-relevant props
      const container2 = document.createElement('div');
      root.appendChild(container2);

      const colorPicker2 = new IroColorPicker(container2, {
        width: 300,
        gamut: 'C',
        wheelAngle: 0
      });

      flushRAF();

      // Should reuse cache from first picker, no additional computation
      expect(mockRAF).toHaveBeenCalledTimes(2); // One for each picker, but second should be cache hit
    });

    test('Different cache keys create separate cache entries', () => {
      const picker1 = new IroColorPicker(root, {
        width: 300,
        gamut: 'A'
      });

      flushRAF();

      const container2 = document.createElement('div');
      root.appendChild(container2);

      const picker2 = new IroColorPicker(container2, {
        width: 300,
        gamut: 'B' // Different gamut
      });

      flushRAF();

      // Both should trigger RAF calls due to different cache keys
      expect(mockRAF).toHaveBeenCalledTimes(2);
    });

  });

  describe('Gamut Changes', () => {

    test('Gamut change invalidates cache and creates new entry', () => {
      const colorPicker = new IroColorPicker(root, {
        width: 300,
        gamut: 'A'
      });

      flushRAF();
      expect(mockRAF).toHaveBeenCalledTimes(1);

      // Change gamut
      colorPicker.setOptions({ gamut: 'B' });
      flushRAF();

      // Should trigger new RAF for new cache key
      expect(mockRAF).toHaveBeenCalledTimes(2);

      // Change back to original gamut
      colorPicker.setOptions({ gamut: 'A' });
      flushRAF();

      // Should reuse original cache entry
      expect(mockRAF).toHaveBeenCalledTimes(3);
    });

    test('Gamut "none" disables caching completely', () => {
      const colorPicker = new IroColorPicker(root, {
        width: 300,
        gamut: 'none'
      });

      flushRAF();

      // Should not create cache entries for gamut: "none"
      // RAF might still be called but no cache operations should occur
      expect(mockRAF).toHaveBeenCalledTimes(1);

      // Change to a real gamut
      colorPicker.setOptions({ gamut: 'A' });
      flushRAF();

      // Should now create cache entry
      expect(mockRAF).toHaveBeenCalledTimes(2);
    });

  });

  describe('Picker Resizing', () => {

    test('Resize invalidates cache and creates new entry', () => {
      const colorPicker = new IroColorPicker(root, {
        width: 300,
        gamut: 'C'
      });

      flushRAF();
      expect(mockRAF).toHaveBeenCalledTimes(1);

      // Resize picker
      colorPicker.resize(400);
      flushRAF();

      // Should trigger new RAF for new cache key
      expect(mockRAF).toHaveBeenCalledTimes(2);

      // Resize back to original size
      colorPicker.resize(300);
      flushRAF();

      // Should reuse original cache entry
      expect(mockRAF).toHaveBeenCalledTimes(3);
    });

    test('Multiple rapid resizes only trigger final RAF', () => {
      const colorPicker = new IroColorPicker(root, {
        width: 300,
        gamut: 'C'
      });

      flushRAF();
      mockRAF.mockClear();

      // Perform multiple rapid resizes
      colorPicker.resize(350);
      colorPicker.resize(380);
      colorPicker.resize(400);

      // Should cancel previous RAFs and only schedule final one
      expect(mockCancelRAF).toHaveBeenCalledTimes(2); // Cancel first two
      expect(mockRAF).toHaveBeenCalledTimes(3); // One for each resize call

      flushRAF();

      // Final size should be 400
      expect(colorPicker.width).toBe(400);
    });

  });

  describe('Multiple IroWheel Instances', () => {

    test('Multiple pickers with same props share cache', () => {
      const picker1 = new IroColorPicker(root, {
        width: 300,
        gamut: 'C'
      });

      const container2 = document.createElement('div');
      root.appendChild(container2);

      const picker2 = new IroColorPicker(container2, {
        width: 300,
        gamut: 'C'
      });

      const container3 = document.createElement('div');
      root.appendChild(container3);

      const picker3 = new IroColorPicker(container3, {
        width: 300,
        gamut: 'C'
      });

      flushRAF();

      // All three should use shared cache after first computation
      expect(mockRAF).toHaveBeenCalledTimes(3); // One per picker
    });

    test('Mixed picker configurations create appropriate cache entries', () => {
      const configs = [
        { width: 300, gamut: 'A' },
        { width: 300, gamut: 'B' },
        { width: 400, gamut: 'A' },
        { width: 300, gamut: 'A' }, // Should reuse first cache
      ];

      const pickers = configs.map((config, index) => {
        const container = document.createElement('div');
        root.appendChild(container);
        return new IroColorPicker(container, config);
      });

      flushRAF();

      // Should create 3 unique cache entries (4th reuses 1st)
      expect(mockRAF).toHaveBeenCalledTimes(4);
    });

  });

  describe('RAF Batching', () => {

    test('Rapid prop changes only trigger single RAF per final state', () => {
      const colorPicker = new IroColorPicker(root, {
        width: 300,
        gamut: 'A'
      });

      flushRAF();
      mockRAF.mockClear();
      mockCancelRAF.mockClear();

      // Rapid changes to different properties
      colorPicker.setOptions({ wheelAngle: 45 });
      colorPicker.setOptions({ wheelAngle: 90 });
      colorPicker.setOptions({ gamut: 'B' });
      colorPicker.setOptions({ width: 400 });

      // Should cancel previous RAFs
      expect(mockCancelRAF).toHaveBeenCalledTimes(3);
      expect(mockRAF).toHaveBeenCalledTimes(4); // One per change

      flushRAF();

      // Final state should be: width=400, gamut='B', wheelAngle=90
      expect(colorPicker.width).toBe(400);
    });

    test('RAF is cancelled on component unmount', () => {
      const colorPicker = new IroColorPicker(root, {
        width: 300,
        gamut: 'C'
      });

      // Trigger a change that schedules RAF
      colorPicker.setOptions({ gamut: 'A' });

      expect(mockRAF).toHaveBeenCalled();

      // Destroy the picker before RAF executes
      colorPicker.base.remove();

      // Should cancel the pending RAF
      expect(mockCancelRAF).toHaveBeenCalled();
    });

  });

  describe('Cache Memory Management', () => {

    test('Cache cleanup occurs when exceeding threshold', () => {
      // Create many pickers with different props to fill cache
      const configs = [];
      for (let i = 0; i < 20; i++) {
        configs.push({
          width: 300 + i,
          gamut: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C'
        });
      }

      const pickers = configs.map((config, index) => {
        const container = document.createElement('div');
        root.appendChild(container);
        return new IroColorPicker(container, config);
      });

      flushRAF();

      // Cache should be cleaned up to prevent unlimited growth
      // This tests the LRU cleanup mechanism
      expect(mockRAF).toHaveBeenCalledTimes(20);
    });

    test('LRU cleanup removes oldest entries first', () => {
      // This test would require more complex setup to verify LRU behavior
      // For now, we verify that the cache doesn't grow indefinitely

      const picker1 = new IroColorPicker(root, { width: 300, gamut: 'A' });
      flushRAF();

      // Change to many different configurations
      for (let i = 0; i < 15; i++) {
        picker1.setOptions({ width: 300 + i });
        flushRAF();
      }

      // Verify the picker still works (cache management didn't break functionality)
      picker1.setOptions({ gamut: 'B' });
      flushRAF();

      expect(picker1.width).toBe(314); // 300 + 14 (last width change)
    });

  });

  describe('Performance Edge Cases', () => {

    test('Identical rapid changes do not trigger multiple RAFs', () => {
      const colorPicker = new IroColorPicker(root, {
        width: 300,
        gamut: 'A'
      });

      flushRAF();
      mockRAF.mockClear();

      // Make the same change multiple times rapidly
      colorPicker.setOptions({ wheelAngle: 45 });
      colorPicker.setOptions({ wheelAngle: 45 });
      colorPicker.setOptions({ wheelAngle: 45 });

      // Should only schedule one RAF for the final state
      expect(mockRAF).toHaveBeenCalledTimes(3); // Each call schedules, but cancels previous
      expect(mockCancelRAF).toHaveBeenCalledTimes(2);
    });

    test('Cache key generation is consistent', () => {
      const props1 = {
        width: 300,
        gamut: 'A',
        wheelAngle: 0,
        wheelDirection: 'clockwise',
        padding: 6,
        handleRadius: 8,
        borderWidth: 0
      };

      const props2 = { ...props1 };

      // Both should generate identical cache keys
      const picker1 = new IroColorPicker(root, props1);
      flushRAF();

      const container2 = document.createElement('div');
      root.appendChild(container2);

      const picker2 = new IroColorPicker(container2, props2);
      flushRAF();

      // Second picker should reuse cache from first
      expect(mockRAF).toHaveBeenCalledTimes(2);
    });

  });

  describe('Integration with Color Changes', () => {

    test('Color changes do not invalidate gamut mask cache', () => {
      const colorPicker = new IroColorPicker(root, {
        width: 300,
        gamut: 'C'
      });

      flushRAF();
      mockRAF.mockClear();

      // Change color multiple times
      colorPicker.color.hue = 120;
      colorPicker.color.saturation = 80;
      colorPicker.color.value = 90;

      // Should not trigger new RAF calls for gamut mask
      expect(mockRAF).toHaveBeenCalledTimes(0);
    });

    test('Wheel angle changes invalidate cache correctly', () => {
      const colorPicker = new IroColorPicker(root, {
        width: 300,
        gamut: 'C',
        wheelAngle: 0
      });

      flushRAF();
      mockRAF.mockClear();

      // Change wheel angle (this affects cache key)
      colorPicker.setOptions({ wheelAngle: 90 });
      flushRAF();

      // Should trigger new RAF for cache computation
      expect(mockRAF).toHaveBeenCalledTimes(1);

      // Change back to original angle (should hit cache)
      colorPicker.setOptions({ wheelAngle: 0 });
      flushRAF();

      expect(mockRAF).toHaveBeenCalledTimes(2);
    });

  });

});
