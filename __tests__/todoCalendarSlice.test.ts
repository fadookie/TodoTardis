import { store } from '../app/store';
import {
  makeTodoList,
  getDateString,
  TodoDate,
  TodoCalendar,
  TodoCalendarState,
  MakeTodoListPayload,
} from '../app/todoCalendarSlice';

const date: Readonly<TodoDate> = Object.freeze(new Date('2011-10-05T14:48:00.000Z'));
const uuidv4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

describe('todoCalendarSlice', () => {
  it('Should initially set games to an empty object', () => {
    const expectedState: TodoCalendarState = {
      todoCalendar: {},
      descriptionMap: {},
    };
    const actualState = store.getState().todoCalendarState;
    expect(actualState).toEqual(expectedState);
  });

  describe('reducer', () => {
    describe('makeTodoList', () => {
      it('should insert a new todo list day into the calendar when none exists', () => {
        const payload: MakeTodoListPayload = {
          date,
          descriptionId: 0,
        };
        store.dispatch(makeTodoList(payload));
        const expectedState: TodoCalendar = {
          '2011-10-05': {
            date,
            list: [{
              id: expect.stringMatching(uuidv4Regex),
              checked: false,
              descriptionId: 0,
            }],
          },
        };
        expect(store.getState().todoCalendarState.todoCalendar).toEqual(expectedState);
      });
    });
  });

  describe('utility functions', () => {
    describe('getDateString', () => {
      it('should return only the date from an ISO 8601 string', () => {
        const dateString = getDateString(date);
        expect(dateString).toEqual('2011-10-05');
      });
    });
  });
});