var style = {
  display: 'inline-block',
  borderRadius: '50%',
  border: '5px double white',
  width: 30,
  height: 30
};

export default {
  empty: {
    ...style,
    backgroundColor: '#ccc'
  },
  full: {
    ...style,
    backgroundColor: 'black'
  },
  placeholder: {
    ...style,
    backgroundColor: 'red'
  }
};
