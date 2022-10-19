import { Action } from "./Actions";
import { nanoid } from "nanoid";
// npm install nanoid@3.1.22
import { findItemIndexById, moveItem } from "../utils/ArrayUtils";
import { DragItem } from "../components/DragItem";

export type Task = {
  id: string;
  text: string;
};

export type List = {
  id: string;
  text: string;
  tasks: Task[];
};

export type AppState = {
  lists: List[];
  draggedItem: DragItem | null;
};

export const AppStateReducer = (
  draft: AppState,
  action: Action
): AppState | void => {
  switch (action.type) {
    case "ADD_LIST": {
      if (action.payload.length > 3) {
        draft.lists.push({
          id: nanoid(),
          text: action.payload,
          tasks: [],
        });
      }
      break;
    }
    case "ADD_TASK": {
      const { text, listId } = action.payload;
      const targetListIndex = findItemIndexById(draft.lists, listId);
      if (text.length > 3 && text.charAt(1) !== " ") {
        draft.lists[targetListIndex].tasks.push({
          id: nanoid(),
          text,
        });
      }
      break;
    }
    case "MOVE_LIST": {
      const { draggedId, hoverId } = action.payload;
      const dragIndex = findItemIndexById(draft.lists, draggedId);
      const hoverIndex = findItemIndexById(draft.lists, hoverId);
      draft.lists = moveItem(draft.lists, dragIndex, hoverIndex);
      break;
    }
    case "SET_DRAGGED_ITEM": {
      draft.draggedItem = action.payload;
      break;
    }
    default: {
      break;
    }
  }
};
