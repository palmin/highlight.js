/*
Language: Objective-C
Author: Valerii Hiora <valerii.hiora@gmail.com>
Contributors: Angel G. Olloqui <angelgarcia.mail@gmail.com>, Matt Diephouse <matt@diephouse.com>, Andrew Farmer <ahfarmer@gmail.com>, Minh Nguyễn <mxn@1ec5.org>, Anders Borum <anders@workingcopyapp.com>
Category: common
*/

function(hljs) {
    var API_CLASS = {
      className: 'built_in',
      begin: '\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+',
    };
    var OBJC_KEYWORDS = {
      keyword:
        'int float while char export sizeof typedef const struct for union ' +
        'unsigned long volatile static bool mutable if do return goto void ' +
        'enum else break extern asm case short default double register explicit ' +
        'signed typename this switch continue wchar_t inline readonly assign ' +
        'readwrite self @synchronized id typeof ' +
        'nonatomic super unichar IBOutlet IBAction strong weak copy ' +
        'in out inout bycopy byref oneway __strong __weak __block __autoreleasing ' +
        '@private @protected @public @try @property @end @throw @catch @finally ' +
        '@autoreleasepool @synthesize @dynamic @selector @optional @required ' +
        '@encode @package @import @defs @compatibility_alias ' +
        '__bridge __bridge_transfer __bridge_retained __bridge_retain ' +
        '__covariant __contravariant __kindof ' +
        '_Nonnull _Nullable _Null_unspecified ' +
        '__FUNCTION__ __PRETTY_FUNCTION__ __attribute__ ' +
        'getter setter retain unsafe_unretained ' +
        'nonnull nullable null_unspecified null_resettable class instancetype ' +
        'NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER ' +
        'NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED ' +
        'NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE ' +
        'NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END ' +
        'NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW ' +
        'NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN',
      literal:
        'false true FALSE TRUE nil YES NO NULL',
      built_in:
        'BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once'
    };
    var LEXEMES = /[a-zA-Z@][a-zA-Z0-9_]*/;
    var CLASS_KEYWORDS = '@interface @class @protocol @implementation';
    var OBJC_IDENTIFIER = '[A-Za-z_]+';
    var OBJC_INNERTYPE = OBJC_IDENTIFIER + '[*]*';
    var OBJC_TYPE = '\\(\\s*' + OBJC_INNERTYPE + '\\s*\\)';
    var CPP_PRIMITIVE_TYPES = {
      className: 'keyword',
      begin: '\\b[a-z\\d_]*_t\\b'
    };
    var PREPROCESSOR =       {
      className: 'meta',
      begin: /#\s*[a-z]+\b/, end: /$/,
      keywords: {
        'meta-keyword':
          'if else elif endif define undef warning error line ' +
          'pragma ifdef ifndef include'
      },
      contains: [
        {
          begin: /\\\n/, relevance: 0
        },
        hljs.inherit(STRINGS, {className: 'meta-string'}),
        {
          className: 'meta-string',
          begin: /<[^\n>]*>/, end: /$/,
          illegal: '\\n',
        },
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE
      ]
    };
    var NUMBERS = {
      className: 'number',
      variants: [
        { begin: '\\b(0b[01\']+)' },
        { begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)(u|U|l|L|ul|UL|f|F|b|B)' },
        { begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)' }
      ],
      relevance: 0
    };
    var STRINGS = {
      className: 'string',
      variants: [
        {
          begin: '(u8?|U)?L?"', end: '"',
          illegal: '\\n',
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: '(u8?|U)?R"', end: '"',
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: '\'\\\\?.', end: '\'',
          illegal: '.'
        }
      ]
    };
    var FUNCTION_TITLE = hljs.IDENT_RE + '\\s*\\(';
    var CPP_KEYWORDS = {
      keyword: 'int float while private char catch import module export virtual operator sizeof ' +
        'dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace ' +
        'unsigned long volatile static protected bool template mutable if public friend ' +
        'do goto auto void enum else break extern using asm case typeid ' +
        'short reinterpret_cast|10 default double register explicit signed typename try this ' +
        'switch continue inline delete alignof constexpr decltype ' +
        'noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary ' +
        'atomic_bool atomic_char atomic_schar ' +
        'atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong ' +
        'atomic_ullong new throw return ' +
        'and or not',
      built_in: 'std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream ' +
        'auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set ' +
        'unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos ' +
        'asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp ' +
        'fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper ' +
        'isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow ' +
        'printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp ' +
        'strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan ' +
        'vfprintf vprintf vsprintf endl initializer_list unique_ptr',
      literal: 'true false nullptr NULL'
    };
    return {
      aliases: ['mm', 'objc', 'obj-c'],
      keywords: OBJC_KEYWORDS,
      lexemes: LEXEMES,
      illegal: '</',
      contains: [
        API_CLASS,
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.C_NUMBER_MODE,
        hljs.QUOTE_STRING_MODE,
        {
          className: 'string',
          variants: [
            {
              begin: '@"', end: '"',
              illegal: '\\n',
              contains: [hljs.BACKSLASH_ESCAPE]
            },
            {
              begin: '\'', end: '[^\\\\]\'',
              illegal: '[^\\\\][^\']'
            }
          ]
        },
        {
          className: 'meta',
          begin: '#',
          end: '$',
          contains: [
            {
              className: 'meta-string',
              variants: [
                { begin: '\"', end: '\"' },
                { begin: '<', end: '>' }
              ]
            }
          ]
        },
        {
          className: 'class',
          begin: '(' + CLASS_KEYWORDS.split(' ').join('|') + ')\\b', end: '({|$)', excludeEnd: true,
          keywords: CLASS_KEYWORDS, lexemes: LEXEMES,
          contains: [
            hljs.UNDERSCORE_TITLE_MODE
          ]
        },
        {
          className: 'objc-method', 
          begin: '[-+]\\s*', end: '\\s*[{;]', 
          excludeEnd: true, excludeBegin: true,
          contains: [
            {
              // name:(type)parameter
              className: 'method-part', 
              begin: OBJC_IDENTIFIER + '\\s*:\\s*' + OBJC_TYPE + '\\s*' + OBJC_IDENTIFIER,
              returnBegin: true,
              contains: [
                {
                  className: 'title',
                  begin: OBJC_IDENTIFIER + '\\s*:',
                  end: '\\s*',
                  excludeEnd: true
                },
                {
                  begin: OBJC_TYPE + '\\s*' + OBJC_IDENTIFIER
                }
              ]
            },
            {
              // name 
              className: 'title', 
              begin: OBJC_IDENTIFIER
           },
            {
              // return type
              begin: OBJC_TYPE
            }
          ]
        },
        {
          className: 'function',
          begin: '(' + hljs.IDENT_RE + '[\\*&\\s]+)+' + FUNCTION_TITLE,
          returnBegin: true, end: /[{;=]/,
          excludeEnd: true,
          keywords: CPP_KEYWORDS,
          illegal: /[^\w\s\*&]/,
          contains: [
            {
              begin: FUNCTION_TITLE, returnBegin: true,
              contains: [hljs.TITLE_MODE],
              relevance: 0
            },
            {
              className: 'params',
              begin: /\(/, end: /\)/,
              keywords: CPP_KEYWORDS,
              relevance: 0,
              contains: [
                hljs.C_LINE_COMMENT_MODE,
                hljs.C_BLOCK_COMMENT_MODE,
                STRINGS,
                NUMBERS,
                CPP_PRIMITIVE_TYPES
              ]
            },
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            PREPROCESSOR
          ]
        },
        {
          begin: '\\.'+hljs.UNDERSCORE_IDENT_RE,
          relevance: 0
        }
      ]
    };
}
