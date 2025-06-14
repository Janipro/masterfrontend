export const NAV_COLORS = {
  background: '#F0F4F9',
  navbarShadow: '#D6E4ED',
  text: '#5D7285',
  background_dark: '#0F0F0F',
  text_dark: '#edfcff',

  editor_background: '#FFFFFF',
  editor_background_dark: '#0F0F0F',
  editor_text: '#000000',
  editor_text_dark: '#FFFFFF',
  editor_pane_background: '#FFFFFF',
  editor_pane_background_dark: '#262626',
  editor_header_background: '#F0F4F9',
  editor_header_background_dark: '#454545',
  editor_button_background: '#FFFFFF',
  editor_button_background_dark: '#323232',
  editor_icon_background: '#5D7285',
  editor_icon_background_dark: '#A7A7A7',
  editor_icon_redo_undo_background: '#323232',
  editor_icon_redo_undo_background_dark: '#A7A7A7',
  editor_menu_background_highlight: '#F5F5F5',
  editor_menu_background_highlight_dark: '#404040',
  editor_icon_expand_background: '#9AB6D7',
  editor_icon_expand_background_dark: '#828282',
  editor_button_template_hover: '#E3EBEF',
  editor_button_template_hover_dark: '#525252',
  editor_button_template_selected_backgroundcolor: '#FFFFFF',
  editor_button_template_selected_backgroundcolor_dark: '#262626',
  editor_button_template_selected_color: '#5D7285',
  editor_button_template_selected_color_dark: '#FFFFFF',
  editor_button_template_unselected_backgroundcolor: '#ebeff2',
  editor_button_template_unselected_backgroundcolor_dark: '#3d3d3d',
  editor_button_template_unselected_color: '#93a7bc',
  editor_button_template_unselected_color_dark: '#aaaaaa',
  editor_textfield_border: '#b0b0b0',
  editor_textfield_border_dark: '#585858',
  editor_textfield_border_hover: '#909090',
  editor_textfield_border_hover_dark: '#909090',
  editor_textfield_border_selected: '#707070',
  editor_textfield_border_selected_dark: '#C0C0C0',
  editor_modal_background: '#FFFFFF',
  editor_modal_background_dark: '#282828',
  editor_modal_color: '#323232',
  editor_modal_color_dark: '#A7A7A7',
};

export const style = (isDarkmode: boolean) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 'auto',
  bgcolor: 'background.paper',
  /*isDarkmode
      ? NAV_COLORS.editor_button_background_dark
      : NAV_COLORS.editor_button_background,*/
  color: isDarkmode ? NAV_COLORS.editor_icon_redo_undo_background_dark : NAV_COLORS.editor_icon_background,
  boxShadow: 5,
  borderRadius: '5px',
  p: 4,
  textAlign: 'center',
});
