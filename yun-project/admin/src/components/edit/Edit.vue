<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="value"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onChange="handleChange"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import {
  onBeforeUnmount,
  defineEmits,
  ref,
  onBeforeMount,
  computed,
  shallowRef,
  onMounted,
  defineProps,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

const emits = defineEmits(["event"]);
let props = defineProps({
  content: String,
});
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
// let valueHtml = ref(`${props.content}`);
let valueHtml = ref("<p>请编写内容</p>");

onBeforeMount(() => {
  console.log(props.content);
  valueHtml.value = `${props.content}`;
});

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

const value = computed({
  get: () => (valueHtml.value !== undefined ? valueHtml.value : "请编辑内容"),
  set: (val) => {
    valueHtml.value = val;
  },
});
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor) => {
  //   console.log(editor);
  //   传给父组件
  emits("event", valueHtml.value); //拿到的是一段html<p>hello</p>
};
</script>

<style lang="scss" scoped></style>
