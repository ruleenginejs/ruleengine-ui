# v-graph-connection

## Props

| Prop name     | Description | Type           | Values | Default                        |
| ------------- | ----------- | -------------- | ------ | ------------------------------ |
| id            |             | string\|number | -      | null                           |
| from          |             | object         | -      | null                           |
| to            |             | object         | -      | null                           |
| invalidate    |             | boolean        | -      | true                           |
| selected      |             | boolean        | -      | false                          |
| color         |             | string         | -      | null                           |
| borderWidth   |             | number         | -      | 3                              |
| className     |             | string         | -      | "v-graph-connection"           |
| selectedClass |             | string         | -      | "v-graph-connection--selected" |
| colorClass    |             | string         | -      | "v-graph-connection--color"    |
| curveFactor   |             | number         | -      | 0.25                           |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:invalidate |            |
| update:selected   |            |
