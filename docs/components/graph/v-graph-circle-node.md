# v-graph-circle-node

## Props

| Prop name      | Description | Type           | Values | Default |
| -------------- | ----------- | -------------- | ------ | ------- |
| id             |             | string\|number | -      | null    |
| title          |             | string         | -      | null    |
| x              |             | number         | -      | 0       |
| y              |             | number         | -      | 0       |
| error          |             | boolean        | -      | false   |
| selected       |             | boolean        | -      | false   |
| linkRule       |             | func           | -      | null    |
| titleLength    |             | number         | -      | 2       |
| clickTolerance |             | number         | -      | 3       |
| invalidate     |             | boolean        | -      | false   |

## Events

| Event name      | Properties | Description |
| --------------- | ---------- | ----------- |
| update:x        |            |
| update:y        |            |
| update:selected |            |
| new-link        |            |
| change-position |            |

## Slots

| Name | Description | Bindings |
| ---- | ----------- | -------- |
| port |             |          |
