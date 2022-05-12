# v-suggest

## Props

| Prop name               | Description | Type            | Values | Default |
| ----------------------- | ----------- | --------------- | ------ | ------- |
| visible                 |             | boolean         | -      | false   |
| dataSource              |             | func            | -      | null    |
| displayField            |             | string          | -      | 'text'  |
| searchQuery             |             | string\|number  | -      | null    |
| searchTimeout           |             | number          | -      | 250     |
| minSearchLength         |             | number          | -      | 1       |
| maxQueryLength          |             | number          | -      | null    |
| maxItemCount            |             | number          | -      | null    |
| size                    |             | string          | -      | 'md'    |
| scrollSize              |             | string          | -      | 'md'    |
| listSize                |             | string          | -      | 'md'    |
| listFocusItem           |             | object          | -      | null    |
| listFocusIndex          |             | number          | -      | null    |
| listFocusLoop           |             | boolean         | -      | false   |
| listResetFocusIndex     |             | number          | -      | 0       |
| offsetX                 |             | number          | -      | null    |
| offsetY                 |             | number          | -      | null    |
| maxWidth                |             | number          | -      | 450     |
| maxHeight               |             | number          | -      | 200     |
| minWidth                |             | number          | -      | 400     |
| anchor                  |             | string          | -      | null    |
| anchorConstraint        |             | boolean\|string | -      | false   |
| actionOnParentScrolling |             | boolean\|string | -      | 'close' |
| loadingMessage          |             | string          | -      | null    |
| emptyResultMessage      |             | string          | -      | null    |
| preventMouseDown        |             | boolean         | -      | false   |
| clearOnInvisible        |             | boolean         | -      | false   |

## Events

| Event name            | Properties | Description |
| --------------------- | ---------- | ----------- |
| update:visible        |            |
| update:listFocusItem  |            |
| update:listFocusIndex |            |
| select                |            |
| error                 |            |
