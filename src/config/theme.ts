import type { ThemeConfig } from 'antd';

export const customColors = {
  primary: '#B75400',
  success: '#8BC34A',
  danger: '#C62828',
  textPrimary: '#616161',
  textSecondary: '#212121',
  textWhite: '#FFFFFF',
  textDisabled: '#9E9E9E',
} as const;

export const customBreakpoints = {
  xs: '360px',
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1024px',
  xxl: '1200px',
  xxxl: '1400px',
} as const;

// Ant Design theme configuration
export const antdTheme: ThemeConfig = {
  token: {
    // Primary colors
    colorPrimary: customColors.primary,
    colorLink: customColors.primary,
    colorLinkHover: '#D4620A',
    colorLinkActive: '#A04A00',
    colorSuccess: customColors.success,
    colorError: customColors.danger,
    colorWarning: '#FF9800',
    colorInfo: '#2196F3',

    // Text colors
    colorText: customColors.textSecondary,
    colorTextSecondary: customColors.textPrimary,
    colorTextDisabled: customColors.textDisabled,
    colorTextPlaceholder: customColors.textDisabled,

    // Background colors
    colorBgContainer: '#FFFFFF',
    colorBgElevated: '#FFFFFF',
    colorBgLayout: '#F5F5F5',

    // Border colors
    colorBorder: '#E0E0E0',
    colorBorderSecondary: '#F0F0F0',

    // Border radius
    borderRadius: 2,
    borderRadiusLG: 8,
    borderRadiusSM: 4,

    // Font settings
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeSM: 12,
    fontSizeHeading5: 20,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

    // Spacing
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    paddingXS: 8,

    // Component specific tokens
    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,
  },
  components: {
    // Button customizations
    Button: {
      primaryColor: customColors.textWhite,
      dangerColor: customColors.textWhite,
      colorPrimary: customColors.primary,
      colorPrimaryHover: '#D4620A',
      colorPrimaryActive: '#A04A00',
      colorPrimaryBorder: 'transparent',
      paddingInline: 16,
      paddingBlock: 8,
      controlHeight: 32,
      algorithm: true,
      colorLink: customColors.primary,
      colorLinkHover: '#D4620A',
      colorLinkActive: '#A04A00',
      // Text button styles
      colorText: customColors.primary,
      // Default button styles
      defaultBg: 'transparent',
      defaultColor: customColors.primary,
      defaultBorderColor: customColors.primary,
      defaultHoverBg: 'rgba(0, 0, 0, 0.06666666666666667)',
      defaultHoverColor: customColors.primary,
      defaultHoverBorderColor: customColors.primary,
    },

    Table: {
      headerBg: 'transparent',
      headerColor: customColors.textSecondary,
      rowHoverBg: '#F5F5F5',
      borderRadius: 2,
      borderRadiusLG: 2,
    },

    Form: {
      labelColor: customColors.textSecondary,
      itemMarginBottom: 16,
    },

    Input: {
      colorText: customColors.textSecondary,
      colorTextPlaceholder: customColors.textDisabled,
      borderRadius: 2,
      colorBorder: customColors.primary,
      controlHeight: 44,
      paddingInline: 14,
    },

    Select: {
      colorText: customColors.textSecondary,
      colorTextPlaceholder: customColors.textDisabled,
    },

    Card: {
      headerBg: 'transparent',
      colorBorderSecondary: '#F0F0F0',
      borderRadius: 5,
      borderRadiusLG: 2,
    },

    Menu: {
      itemColor: '#757575',
      itemSelectedColor: customColors.primary,
      itemSelectedBg: '#FFF3E0',
      itemHoverBg: '#f5f5f5',
      itemPaddingInline: 16,
      borderRadius: 2,
      colorBgElevated: '#fff',
      colorBorder: '#e0e0e0',
    },

    Dropdown: {
      colorBgElevated: '#fff',
      colorBorder: '#e0e0e0',
      borderRadius: 2,
      paddingBlock: 8,
      algorithm: true,
    },

    Typography: {
      titleMarginBottom: '0.5em',
      titleMarginTop: '1.2em',
    },

    /** Root `.ant-layout` uses `background: bodyBg`. Global `.ant-layout { }` loses to CSS-in-js when registry uses `hashPriority="high"`. */
    Layout: {
      bodyBg: '#FFFFFF',
    },

    Tabs: {
      itemColor: customColors.primary,
      itemSelectedColor: customColors.textWhite,
      itemHoverColor: '#D4620A',
      inkBarColor: 'transparent',
      cardBg: 'transparent',
      borderRadius: 0,
      margin: 24,
      cardHeight: 26,
    },

    Collapse: {
      headerBg: 'transparent',
      contentBg: 'transparent',
      borderlessContentBg: 'transparent',
    },

  },
};

// Export individual theme tokens for use in custom CSS
export const themeTokens = {
  colors: customColors,
  breakpoints: customBreakpoints,
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    lg: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
} as const;
