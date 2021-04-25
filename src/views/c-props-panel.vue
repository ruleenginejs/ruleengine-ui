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
              :header-border="false"
              :bottom-border="false"
            >
              <v-fieldset b-border label="Some input group">
                <v-field-layout>
                  <v-label>Some property</v-label>
                  <v-input>
                    <template #icon>
                      <v-icon-file-menu />
                    </template>
                  </v-input>
                </v-field-layout>
                <v-field-layout>
                  <v-label>Some property</v-label>
                  <v-input />
                </v-field-layout>
              </v-fieldset>
              <v-fieldset label="Some input group">
                <v-field-layout vertical>
                  <v-label>Some property</v-label>
                  <v-input />
                </v-field-layout>
                <v-field-layout vertical>
                  <v-label>Some property</v-label>
                  <v-input>
                    <template #icon>
                      <v-icon-file-menu />
                    </template>
                  </v-input>
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
