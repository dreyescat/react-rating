import merge from './merge';

var style = {
  display: 'inline-block',
  borderRadius: '50%',
  border: '5px double white',
  width: 30,
  height: 30
};

export default {
  empty: merge(style, {
    backgroundColor: '#ccc'
  }),
  full: merge(style, {
    backgroundColor: 'black'
  }),
  placeholder: merge(style, {
    backgroundColor: 'red'
  })
};
