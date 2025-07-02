# **App Name**: ShopStream

## Core Features:

- Rotating Banner: Displays a rotating banner on the homepage to showcase featured products or promotions. The image paths for the banners are configurable via a JSON or JS data file.
- Countdown Timer: Implements a countdown timer to create a sense of urgency for promotions or sales. The target date/time is configurable via a JSON or JS data file.
- Product Filters: Offers a filtering system (within a popup modal) with dropdown menus for price, alphabetical order, popularity, and product type.
- Dynamic Product Loading: Dynamically loads product cards on the homepage using data fetched from the fakestoreapi.com API. Initially displays 6 products, and adds 4 more each time the user scrolls to the bottom of the page.
- Shopping Cart Modal: Presents a shopping cart modal which displays added items (image, name, original price, discounted price) with a checkout button. Shopping cart content can be changed, but data will not persist after page refresh.
- Product Page Display: Displays a product image gallery (using carousels for multiple images), a discount sticker, product name/prices, descriptions, and customer reviews on the product page.
- Customer Review Carousel: Includes customer reviews displayed in a carousel format.  The review data will be configurable through a JSON or JS data file.

## Style Guidelines:

- Primary color: HSL(38, 80%, 45%) translates to a rich gold (#B8860B), evoking a sense of luxury and value relevant to commerce.
- Background color: Desaturated gold at HSL(38, 20%, 95%), i.e.  a very light yellow (#F9F6EF).
- Accent color: HSL(8, 70%, 50%) which translates to a strong coral (#D65A31), for use in calls to action and highlights, is analogous and attention-getting.
- Font pairing: 'Playfair' (serif) for headlines and 'PT Sans' (sans-serif) for body text. 'Playfair' is good for short amounts of text, 'PT Sans' will improve readability in blocks of text.
- Minimalist icons for UI elements such as the shopping cart, filter, and close buttons.
- Responsive layout adapting to different screen sizes, ensuring a consistent and user-friendly experience across devices. Homepage consists of the Banner, Countdown Timer, Filters, Dynamic product grid, and Footer
- Subtle transitions and animations for loading new products and when interacting with the shopping cart.