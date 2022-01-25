# v-graph-node

## Props

| Prop name      | Description | Type           | Values | Default |
| -------------- | ----------- | -------------- | ------ | ------- |
| id             |             | string\|number | -      | null    |
| title          |             | string         | -      | null    |
| x              |             | number         | -      | 0       |
| y              |             | number         | -      | 0       |
| headerColor    |             | string         | -      | null    |
| selected       |             | boolean        | -      | false   |
| linkRule       |             | func           | -      | null    |
| clickTolerance |             | number         | -      | 3       |
| invalidate     |             | boolean        | -      | false   |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:x          |            |
| update:y          |            |
| update:selected   |            |
| update:invalidate |            |
| new-link          |            |
| change-position   |            |

## Slots

| Name              | Description | Bindings |
| ----------------- | ----------- | -------- |
| header-left-icon  |             |          |
| header-right-icon |             |          |
| left              |             |          |
| right             |             |          |
