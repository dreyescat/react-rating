# React Rating

React Rating is a [react](https://github.com/facebook/react) rating component which supports custom symbols both with [inline styles](https://facebook.github.io/react/tips/inline-styles.html) and glyphicons found in popular CSS Toolkits like [Fontawesome](http://fortawesome.github.io/Font-Awesome/icons/) or [Bootstrap](http://getbootstrap.com/components/).

I intend to port the jQuery [bootstrap-rating](https://github.com/dreyescat/bootstrap-rating) to a React component.

## Demo

See [react-rating](http://dreyescat.github.io/react-rating/) in action.

## Installation

You can install `react-rating` component using the *npm* package manager:

```bash
npm install --save react-rating
```

### Dependencies

The `react-rating` component [peer depends](https://docs.npmjs.com/files/package.json#peerdependencies) on the [React](http://facebook.github.io/react/) library.

You can install React using *npm* too:

```bash
npm install --save react
```

## Usage

1. Require the Rating Component

    ```javascript
    var Rating = require('react-rating');
    ```

2. Start using it

    With raw javascript:

    ```javascript
    React.createElement(Rating)
    ```

    Or with JSX:

    ```jsx
    <Rating />
    ```

## Properties

Property      | Type                    | Default              | Description
---           | ---                     | ---                  | ---
`start`       | *number*                | 0                    | Range starting value (exclusive).
`stop`        | *number*                | 5                    | Range stop value (inclusive).
`step`        | *number*                | 1                    | Step increment (negative) or decrement (positive).
`initialRate` | *number*                | undefined            | Initial rate value.
`empty`       | *string* or *object*    | Style.empty          | Inline style object or classes applied to the rating symbols when empty.
`filled`      | *string*                | Style.full           | Inline style object or classes applied to the rating symbols when filled.
`readonly`    | *bool*                  | false                | Whether the rating can be modified or not.
`fractions`   | *number*                | 1                    | Number of equal parts that make up a whole symbol.

## Callbacks

Callback      | Type                    | Description
---           | ---                     | ---
`onChange`    | function (rate) {}      | Called when the rate is changed.

## License

[MIT License](https://github.com/dreyescat/react-rating/blob/master/LICENSE.md)
