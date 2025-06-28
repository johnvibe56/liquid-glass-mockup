# CSS to Flutter Styling Mapping Guide

This document maps common CSS properties and patterns used in the liquid glass mockup to their Flutter equivalents.

## Table of Contents
1. [Layout Properties](#layout-properties)
2. [Box Model](#box-model)
3. [Flexbox/Grid to Rows/Columns](#flexbox--grid)
4. [Positioning](#positioning)
5. [Typography](#typography)
6. [Colors and Gradients](#colors-and-gradients)
7. [Borders and Shadows](#borders-and-shadows)
8. [Transforms and Transitions](#transforms-and-transitions)
9. [Glass Effect Implementation](#glass-effect-implementation)
10. [Animations](#animations)
11. [Common Patterns](#common-patterns)

## Layout Properties

### CSS
```css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
```

### Flutter
```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    Widget1(),
    SizedBox(height: 16), // For gap
    Widget2(),
  ],
)
```

## Box Model

### CSS
```css
.element {
  width: 100%;
  max-width: 400px;
  height: 200px;
  margin: 16px;
  padding: 24px;
  box-sizing: border-box;
}
```

### Flutter
```dart
Container(
  width: double.infinity, // 100%
  constraints: BoxConstraints(maxWidth: 400),
  height: 200,
  margin: EdgeInsets.all(16),
  padding: EdgeInsets.all(24),
  child: /* child widget */,
)
```

## Flexbox / Grid

### CSS (Flexbox)
```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.item {
  flex: 1 1 200px;
}
```

### Flutter
```dart
Wrap(
  spacing: 16,
  runSpacing: 16,
  children: [
    for (var item in items)
      SizedBox(
        width: 200,
        child: ItemWidget(item: item),
      ),
  ],
)
```

### CSS (Grid)
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
```

### Flutter
```dart
GridView.builder(
  gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
    maxCrossAxisExtent: 200,
    childAspectRatio: 1,
    crossAxisSpacing: 16,
    mainAxisSpacing: 16,
  ),
  itemCount: items.length,
  itemBuilder: (context, index) => ItemWidget(item: items[index]),
)
```

## Positioning

### CSS
```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 10;
}
```

### Flutter
```dart
Stack(
  children: [
    ParentWidget(),
    Positioned(
      top: 10,
      right: 20,
      child: ChildWidget(),
    ),
  ],
)
```

## Typography

### CSS
```css
.text {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: #ffffff;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
```

### Flutter
```dart
Text(
  'Sample Text',
  style: TextStyle(
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: 16,
    fontWeight: FontWeight.w500,
    height: 1.5,
    letterSpacing: 0.5,
    color: Colors.white,
  ),
  textAlign: TextAlign.center,
  overflow: TextOverflow.ellipsis,
  maxLines: 1,
)
```

## Colors and Gradients

### CSS
```css
.element {
  /* Solid color */
  background-color: rgba(255, 255, 255, 0.1);
  
  /* Linear gradient */
  background: linear-gradient(45deg, #0f0f1a 0%, #1a1a2e 100%);
  
  /* Radial gradient */
  background: radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 100%);
}
```

### Flutter
```dart
Container(
  // Solid color with opacity
  color: Colors.white.withOpacity(0.1),
  
  // Linear gradient
  decoration: BoxDecoration(
    gradient: LinearGradient(
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
      colors: [Color(0xFF0f0f1a), Color(0xFF1a1a2e)],
    ),
  ),
  
  // Radial gradient
  decoration: BoxDecoration(
    gradient: RadialGradient(
      center: Alignment.center,
      radius: 1.0,
      colors: [Color(0xFF1a1a2e), Color(0xFF0f0f1a)],
    ),
  ),
)
```

## Borders and Shadows

### CSS
```css
.element {
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

### Flutter
```dart
Container(
  decoration: BoxDecoration(
    border: Border.all(
      color: Colors.white.withOpacity(0.2),
      width: 1,
    ),
    borderRadius: BorderRadius.circular(12),
    boxShadow: [
      BoxShadow(
        color: Colors.black.withOpacity(0.1),
        blurRadius: 12,
        offset: Offset(0, 4),
      ),
    ],
  ),
)
```

## Glass Effect Implementation

### CSS
```css
.glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.18);
}
```

### Flutter
```dart
import 'dart:ui' as ui;

class GlassContainer extends StatelessWidget {
  final Widget child;
  final double blur;
  
  const GlassContainer({
    Key? key,
    required this.child,
    this.blur = 20.0,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      child: BackdropFilter(
        filter: ui.ImageFilter.blur(
          sigmaX: blur,
          sigmaY: blur,
        ),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.08),
            border: Border.all(
              color: Colors.white.withOpacity(0.18),
              width: 1,
            ),
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.18),
                blurRadius: 32,
                offset: Offset(0, 8),
              ),
            ],
          ),
          child: child,
        ),
      ),
    );
  }
}
```

## Animations

### CSS
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.element {
  animation: fadeIn 0.3s ease-out forwards;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.element:hover {
  transform: scale(1.05);
}
```

### Flutter
```dart
// Using AnimatedContainer for simple animations
AnimatedContainer(
  duration: Duration(milliseconds: 300),
  curve: Curves.easeInOut,
  transform: Matrix4.identity()..scale(isHovered ? 1.05 : 1.0),
  child: // child widget
)

// Using TweenAnimationBuilder for custom animations
TweenAnimationBuilder<double>(
  tween: Tween(begin: 0, end: 1),
  duration: Duration(milliseconds: 300),
  curve: Curves.easeOut,
  builder: (context, value, child) {
    return Opacity(
      opacity: value,
      child: Transform.translate(
        offset: Offset(0, 20 * (1 - value)),
        child: child,
      ),
    );
  },
  child: // widget to animate
)
```

## Common Patterns

### CSS
```css
/* Center content */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

/* Full viewport container */
.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* Text overflow */
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### Flutter
```dart
// Center content
Center(
  child: // widget to center
)

// Alternative using Container
Container(
  width: double.infinity,
  height: double.infinity,
  child: Center(
    child: // widget to center
  ),
)

// Full viewport container
Positioned.fill(
  child: // widget to fill
)

// Text overflow
Text(
  'Long text that might overflow',
  overflow: TextOverflow.ellipsis,
  maxLines: 1,
)
```

## Responsive Design

### CSS
```css
/* Media queries */
.container {
  padding: 16px;
}

@media (min-width: 600px) {
  .container {
    padding: 24px;
  }
}
```

### Flutter
```dart
LayoutBuilder(
  builder: (context, constraints) {
    final padding = constraints.maxWidth > 600 ? 24.0 : 16.0;
    
    return Padding(
      padding: EdgeInsets.all(padding),
      child: // content
    );
  },
)

// Or using MediaQuery
double getPadding(BuildContext context) {
  return MediaQuery.of(context).size.width > 600 ? 24.0 : 16.0;
}
```

## Custom Paint (Complex Shapes)

### CSS
```css
.shape {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}
```

### Flutter
```dart
CustomPaint(
  size: Size(200, 200),
  painter: ShapePainter(),
)

class ShapePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..shader = LinearGradient(
        colors: [Color(0xFFFF6B6B), Color(0xFF4ECDC4)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));

    final path = Path()
      ..moveTo(size.width * 0.5, 0)
      ..lineTo(size.width, size.height * 0.5)
      ..lineTo(size.width * 0.5, size.height)
      ..lineTo(0, size.height * 0.5)
      ..close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
```

This guide covers the most common CSS to Flutter mappings. For more complex scenarios, Flutter's rich widget library and custom painting capabilities provide powerful alternatives to CSS features.
