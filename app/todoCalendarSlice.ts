import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Newtype, newtype, unwrap } from '@kanwren/minewt';
import uuid from 'react-native-uuid';

export type DescriptionId = number;

export type DescriptionMap = Record<number, string>;

export type UUIDv4 = Newtype<string, { readonly _: unique symbol; }>;

function makeUUIDv4(): UUIDv4 {
  const _makeUUIDv4 = newtype<UUIDv4>();
  const u = uuid.v4();
  return _makeUUIDv4(u);
}

export type TodoDate = Date; //TODO: Use a better date library?

export interface TodoItem {
  id: UUIDv4,
  descriptionId: DescriptionId,
  checked: boolean,
}

export type TodoList = TodoItem[];

export interface TodoCalendarDay {
  date: TodoDate, 
  list: TodoList,
};

// TODO: Key is ISO date. Replace key with something else, like epoch day int?
export type TodoCalendar = Record<string, TodoCalendarDay>;

export interface TodoCalendarState {
  todoCalendar: TodoCalendar,
  descriptionMap: DescriptionMap,
};

const initialState: TodoCalendarState = {
  todoCalendar: {},
  descriptionMap: {},
};

export interface MakeTodoListPayload {
  date: TodoDate,
  descriptionId: DescriptionId,
};

export function getDateString(date: TodoDate): string {
  const isoString = date.toISOString();
  const dateString = isoString.slice(0, 10);
  return dateString;
}

export const todoCalendarSlice = createSlice({
  name: 'todoCalendarState',
  initialState,
  reducers: {
    makeTodoList: (state, action: PayloadAction<MakeTodoListPayload>) => {
      const { date, descriptionId } = action.payload;
      const dateString = getDateString(date);
      if (Object.hasOwn(state.todoCalendar, dateString)) throw new Error(`Attempted to make todo list for date ${dateString} but one already existed`);
      const initialTodoItem: TodoItem = {
        id: makeUUIDv4(),
        checked: false,
        descriptionId,
      };
      const todoCalendarDay: TodoCalendarDay = {
        date,
        list: [initialTodoItem],
      };
      state.todoCalendar[dateString] = todoCalendarDay;
    },
    // setTodoListItem
    // increment: (state) => {
    // },
  },
})

// Action creators are generated for each case reducer function
export const { makeTodoList } = todoCalendarSlice.actions

export default todoCalendarSlice.reducer