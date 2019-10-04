/* eslint-disable @typescript-eslint/camelcase */

const jsBeautyOptions = {
  brace_style: 'collapse',
  break_chained_methods: false,
  comma_first: false,
  e4x: false,
  end_with_newline: true,
  indent_char: ' ',
  indent_empty_lines: false,
  indent_inner_html: false,
  indent_scripts: 'normal',
  indent_size: 2,
  jslint_happy: false,
  keep_array_indentation: false,
  max_preserve_newlines: 1,
  preserve_newlines: true,
  space_before_conditional: true,
  unescape_strings: true,
  wrap_line_length: 40,
} as const;

export default jsBeautyOptions;
