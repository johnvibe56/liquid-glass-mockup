# Flutter Implementation Guide

This guide explains how to implement the liquid glass mockup in Flutter, mapping HTML/CSS/JS to Flutter widgets and patterns.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Widget Hierarchy](#widget-hierarchy)
3. [Styling Guide](#styling-guide)
4. [Animation Guide](#animation-guide)
5. [State Management](#state-management)
6. [Useful Packages](#useful-packages)

## Project Structure

```
lib/
├── main.dart              # App entry point
├── models/
│   └── product.dart       # Product data model
├── screens/
│   └── home_screen.dart   # Main screen with product feed
├── widgets/
│   ├── app_bar.dart      # Custom app bar
│   ├── bottom_nav_bar.dart # Bottom navigation
│   ├── product_card.dart   # Product card widget
│   └── glass_container.dart # Reusable glass effect
└── theme/
    ├── app_theme.dart    # Theme data
    └── colors.dart        # Color constants
```

## Widget Hierarchy

### Main App Structure
```dart
MaterialApp(
  title: 'Liquid Glass',
  theme: AppTheme.lightTheme,  // Custom theme
  home: PhoneFrame(),
)

class PhoneFrame extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 375,
      height: 812,
      decoration: BoxDecoration(
        color: Colors.black,
        borderRadius: BorderRadius.circular(50),
        boxShadow: [
          BoxShadow(
            color: Colors.black26,
            blurRadius: 20,
            spreadRadius: 5,
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(40),
        child: AppScreen(),
      ),
    );
  }
}
```

### App Screen Structure
```dart
class AppScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // Background with gradient overlay
        Positioned.fill(
          child: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  Color(0xFF1a1a2e),
                  Color(0xFF0f0f1a),
                ],
              ),
            ),
          ),
        ),
        
        // Main content
        Column(
          children: [
            // Notch area
            Container(
              height: 35,
              color: Colors.black,
            ),
            
            // Main content
            Expanded(
              child: HomeScreen(),
            ),
          ],
        ),
      ],
    );
  }
}
```

## Styling Guide

### Glass Effect
```dart
class GlassContainer extends StatelessWidget {
  final Widget child;
  final double? width;
  final double? height;
  final double borderRadius;
  final double blur;
  
  const GlassContainer({
    Key? key,
    required this.child,
    this.width,
    this.height,
    this.borderRadius = 16.0,
    this.blur = 10.0,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(borderRadius),
        color: Colors.white.withOpacity(0.08),
        border: Border.all(
          color: Colors.white.withOpacity(0.16),
          width: 1.0,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: blur,
            spreadRadius: 1.0,
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(borderRadius),
        child: BackdropFilter(
          filter: ImageFilter.blur(
            sigmaX: blur,
            sigmaY: blur,
          ),
          child: child,
        ),
      ),
    );
  }
}
```

### Product Card
```dart
class ProductCard extends StatelessWidget {
  final Product product;
  
  const ProductCard({
    Key? key,
    required this.product,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GlassContainer(
      margin: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Product Image
          AspectRatio(
            aspectRatio: 1,
            child: Image.network(
              product.imageUrl,
              fit: BoxFit.cover,
            ),
          ),
          
          // Product Info
          Padding(
            padding: EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  product.name,
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 8),
                Text(
                  product.description,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.white.withOpacity(0.9),
                  ),
                ),
                SizedBox(height: 12),
                Text(
                  '\$${product.price.toStringAsFixed(2)}',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
```

## Animation Guide

### Scroll Effects
```dart
class _HomeScreenState extends State<HomeScreen> {
  final ScrollController _scrollController = ScrollController();
  double _scrollPosition = 0;
  bool _isNavBarVisible = true;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_handleScroll);
  }

  void _handleScroll() {
    setState(() {
      _scrollPosition = _scrollController.position.pixels;
      // Show/hide navbar based on scroll direction
      if (_scrollPosition > 100 && _isNavBarVisible) {
        _isNavBarVisible = false;
      } else if (_scrollPosition <= 100 && !_isNavBarVisible) {
        _isNavBarVisible = true;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Stack(
        children: [
          // Product List
          ListView.builder(
            controller: _scrollController,
            padding: EdgeInsets.only(bottom: 80),
            itemCount: products.length,
            itemBuilder: (context, index) {
              return ProductCard(product: products[index]);
            },
          ),
          
          // Animated App Bar
          AnimatedPositioned(
            duration: Duration(milliseconds: 300),
            top: _isNavBarVisible ? 0 : -100,
            left: 0,
            right: 0,
            child: CustomAppBar(),
          ),
        ],
      ),
      bottomNavigationBar: AnimatedOpacity(
        duration: Duration(milliseconds: 300),
        opacity: _isNavBarVisible ? 1.0 : 0.0,
        child: BottomNavBar(),
      ),
    );
  }
}
```

## State Management

For this app, you can use either:

1. **Provider** (Recommended for simplicity)
   - For managing theme, user preferences, and product data
   - Good for small to medium apps

2. **Riverpod**
   - More type-safe and testable
   - Better for larger apps with complex state

## Useful Packages

```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_bloc: ^8.1.3  # For state management (optional)
  provider: ^6.0.5      # For dependency injection
  cached_network_image: ^3.3.0  # For image caching
  google_fonts: ^5.1.0  # For custom fonts
  flutter_svg: ^2.0.7   # For SVG support
  shimmer: ^3.0.0        # For loading placeholders
```

## Implementation Tips

1. **Performance**
   - Use `const` constructors where possible
   - Implement `ListView.builder` for long lists
   - Cache expensive computations

2. **Responsive Design**
   - Use `MediaQuery` for screen dimensions
   - Implement `LayoutBuilder` for responsive layouts
   - Test on multiple device sizes

3. **Accessibility**
   - Add semantic labels
   - Ensure proper color contrast
   - Support dynamic text sizing

4. **Testing**
   - Write widget tests for critical components
   - Test edge cases
   - Verify animations and interactions

## Next Steps

1. Implement the data layer with models and services
2. Set up routing and navigation
3. Add error handling and loading states
4. Implement analytics and crash reporting
5. Add localization support if needed
