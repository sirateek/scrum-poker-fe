import { reactive } from "vue";

export interface DialogBoxAction {
  title: string;
  color?: string;
  onClick: () => void;
}

export interface DialogBoxAttribute {
  isShown: boolean;
  isPersistent: boolean;
  content: DialogBoxContent;
  actions: Array<DialogBoxAction>;
}

export interface DialogBoxContent {
  title?: string;
  detail?: string;
}

export function useDialogBox() {
  const dialogBoxAttribute = reactive({
    isShown: false,
    isPersistent: false,
    content: {} as DialogBoxContent,
    actions: [] as Array<DialogBoxAction>,
  });

  function dismissDialogBox() {
    dialogBoxAttribute.isShown = false;
  }

  function showDialogBox(
    content: DialogBoxContent,
    actions: Array<DialogBoxAction>,
    isPersistent: boolean
  ) {
    dialogBoxAttribute.content = content;
    dialogBoxAttribute.actions = actions;
    dialogBoxAttribute.isPersistent = isPersistent;
    dialogBoxAttribute.isShown = true;
  }

  return { dialogBoxAttribute, dismissDialogBox, showDialogBox };
}
