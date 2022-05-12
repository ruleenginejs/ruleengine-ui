# v-input

## Props

| Prop name     | Description | Type           | Values | Default |
| ------------- | ----------- | -------------- | ------ | ------- |
| modelValue    |             | string\|number | -      | null    |
| id            |             | string\|number | -      | null    |
| type          |             | string         | -      | 'text'  |
| tabIndex      |             | number         | -      | 0       |
| className     |             | string         | -      | null    |
| iconClickable |             | boolean        | -      | false   |
| disabled      |             | boolean        | -      | false   |
| readonly      |             | boolean        | -      | false   |
| info          |             | boolean        | -      | false   |
| warning       |             | boolean        | -      | false   |
| error         |             | boolean        | -      | false   |
| message       |             | string         | -      | null    |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:modelValue |            |
| icon-click        |            |

## Slots

| Name | Description | Bindings |
| ---- | ----------- | -------- |
| icon |             |          |
