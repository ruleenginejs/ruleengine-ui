# v-autocomplete

## Props

| Prop name          | Description | Type           | Values | Default |
| ------------------ | ----------- | -------------- | ------ | ------- |
| modelValue         |             | string\|number | -      | null    |
| dataSource         |             | func           | -      | null    |
| placeholder        |             | string         | -      | null    |
| disabled           |             | boolean        | -      | false   |
| readonly           |             | boolean        | -      | false   |
| tabIndex           |             | number         | -      | 0       |
| iconClickable      |             | boolean        | -      | false   |
| displayField       |             | string         | -      | 'text'  |
| valueField         |             | string         | -      | 'text'  |
| searchTimeout      |             | number         | -      | 250     |
| minSearchLength    |             | number         | -      | 1       |
| maxLength          |             | number         | -      | null    |
| maxItemCount       |             | number         | -      | null    |
| loadingMessage     |             | string         | -      | null    |
| emptyResultMessage |             | string         | -      | null    |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:modelValue |            |
| error             |            |
| icon-click        |            |

## Slots

| Name | Description | Bindings |
| ---- | ----------- | -------- |
| icon |             |          |
