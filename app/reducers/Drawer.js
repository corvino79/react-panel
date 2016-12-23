const initialState = {
    open: false
}

const Drawer = (state = initialState, action) => {
  switch (action.type)
  {
    case 'OPEN_DRAWWER':
      return {
        id: action.id,
        open: action.open
      }
      break;

    default:
      return state;
  }
}
