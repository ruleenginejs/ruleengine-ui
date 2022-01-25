# v-graph-port

## Props

| Prop name | Description | Type           | Values | Default |
| --------- | ----------- | -------------- | ------ | ------- |
| id        |             | string\|number | -      | null    |
| error     |             | boolean        | -      | false   |
| disabled  |             | boolean        | -      | false   |
| selected  |             | boolean        | -      | false   |
| linkLimit |             | number         | -      | null    |
| linkRule  |             | func           | -      | null    |
| direction |             | string         | -      | null    |

## Events

| Event name      | Properties | Description |
| --------------- | ---------- | ----------- |
| link            |            |
| unlink          |            |
| new-link        |            |
| update:selected |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
