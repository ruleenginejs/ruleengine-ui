<template>
  <v-content padding="md" style="height: 600px">
    <v-split-view :snap-offset="70">
      <v-split-pane>Content</v-split-pane>
      <v-split-pane size="300px">
        <v-sidebar lt-border w-full h-full>
          <v-content scroll="sm" h-full w-full>
            <v-sidebar-section
              title="Properties"
              header-compact
              expand
              :header-border="true"
              :bottom-border="false"
            >
              <v-fieldset b-border label="Some input group">
                <v-field-layout>
                  <template #label>
                    <v-label truncate>Some property</v-label>
                  </template>
                  <template #value>
                    <v-input>
                      <template #icon>
                        <v-icon-file-menu />
                      </template>
                    </v-input>
                  </template>
                </v-field-layout>
                <v-field-layout>
                  <template #label>
                    <v-label truncate>Some property</v-label>
                  </template>
                  <template #value>
                    <v-input />
                  </template>
                </v-field-layout>
              </v-fieldset>
              <v-fieldset label="Some input group">
                <v-field-layout vertical>
                  <template #label>
                    <v-label truncate>Some property</v-label>
                  </template>
                  <template #value>
                    <v-input />
                  </template>
                </v-field-layout>
                <v-field-layout>
                  <template #label>
                    <v-label truncate>Some property</v-label>
                  </template>
                  <template #value>
                    <v-label truncate>Some property</v-label>
                  </template>
                </v-field-layout>
              </v-fieldset>
            </v-sidebar-section>
          </v-content>
        </v-sidebar>
      </v-split-pane>
    </v-split-view>
  </v-content>
</template>

<script>
export default {
  name: "c-props-panel"
};
</script>
