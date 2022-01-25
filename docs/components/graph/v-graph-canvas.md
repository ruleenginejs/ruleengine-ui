# v-graph-canvas

## Props

| Prop name      | Description | Type    | Values | Default |
| -------------- | ----------- | ------- | ------ | ------- |
| viewport       |             | array   | -      | [0, 0]  |
| zoom           |             | number  | -      | 100     |
| minZoom        |             | number  | -      | 1       |
| maxZoom        |             | number  | -      | 300     |
| zoomSnap       |             | number  | -      | 1       |
| zoomIntensity  |             | number  | -      | 1       |
| moveIntensity  |             | number  | -      | 0.4     |
| edgeMaxStep    |             | number  | -      | 10      |
| edgeSizes      |             | object  | -      | null    |
| selected       |             | boolean | -      | false   |
| resizeDelay    |             | number  | -      | 100     |
| clickTolerance |             | number  | -      | 3       |

## Events

| Event name      | Properties | Description |
| --------------- | ---------- | ----------- |
| update:selected |            |
| update:zoom     |            |
| update:viewport |            |

## Slots

| Name       | Description | Bindings |
| ---------- | ----------- | -------- |
| connection |             |          |
| node       |             |          |
