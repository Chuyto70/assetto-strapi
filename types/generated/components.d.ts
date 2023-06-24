import type { Schema, Attribute } from '@strapi/strapi';

export interface ProductsColors extends Schema.Component {
  collectionName: 'components_products_colors';
  info: {
    displayName: 'Colors';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    color: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    product: Attribute.Relation<
      'products.colors',
      'oneToOne',
      'api::product.product'
    >;
  };
}

export interface ProductsSizes extends Schema.Component {
  collectionName: 'components_products_sizes';
  info: {
    displayName: 'Sizes';
    description: '';
  };
  attributes: {
    size: Attribute.String & Attribute.Required;
    quantity: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: -1;
      }>;
  };
}

export interface SectionsCart extends Schema.Component {
  collectionName: 'components_sections_carts';
  info: {
    displayName: 'Cart';
    description: '';
  };
  attributes: {
    checkout_page: Attribute.Relation<
      'sections.cart',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface SectionsCheckoutComplete extends Schema.Component {
  collectionName: 'components_sections_checkouts_complete';
  info: {
    displayName: 'CheckoutComplete';
  };
  attributes: {
    cart_page: Attribute.Relation<
      'sections.checkout-complete',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface SectionsCheckoutTunnel extends Schema.Component {
  collectionName: 'components_sections_checkouts_tunnel';
  info: {
    displayName: 'CheckoutTunnel';
    description: '';
  };
  attributes: {
    cart_page: Attribute.Relation<
      'sections.checkout-tunnel',
      'oneToOne',
      'api::page.page'
    >;
    complete_page: Attribute.Relation<
      'sections.checkout-tunnel',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface SectionsProductList extends Schema.Component {
  collectionName: 'components_sections_products_list';
  info: {
    displayName: 'Products list';
    description: '';
  };
  attributes: {
    filters: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface SectionsProductSelectedList extends Schema.Component {
  collectionName: 'components_sections_products_selected_list';
  info: {
    displayName: 'Products selected list';
    description: '';
  };
  attributes: {
    products: Attribute.Relation<
      'sections.product-selected-list',
      'oneToMany',
      'api::product.product'
    >;
    filters: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface SectionsSingleProduct extends Schema.Component {
  collectionName: 'components_sections_single_products';
  info: {
    displayName: 'Single product';
  };
  attributes: {
    product: Attribute.Relation<
      'sections.single-product',
      'oneToOne',
      'api::product.product'
    >;
  };
}

export interface SeoDefaultSeo extends Schema.Component {
  collectionName: 'components_seo_default_seos';
  info: {
    displayName: 'default seo';
    icon: 'info';
    description: '';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Alh\u00E9na title'>;
    siteName: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Alh\u00E9na sitename'>;
    description: Attribute.Text & Attribute.Required;
  };
}

export interface SeoSeo extends Schema.Component {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'Seo';
    icon: 'info';
    description: '';
  };
  attributes: {
    template_title: Attribute.String & Attribute.Unique;
    title_suffix: Attribute.String;
    meta_description: Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'products.colors': ProductsColors;
      'products.sizes': ProductsSizes;
      'sections.cart': SectionsCart;
      'sections.checkout-complete': SectionsCheckoutComplete;
      'sections.checkout-tunnel': SectionsCheckoutTunnel;
      'sections.product-list': SectionsProductList;
      'sections.product-selected-list': SectionsProductSelectedList;
      'sections.single-product': SectionsSingleProduct;
      'seo.default-seo': SeoDefaultSeo;
      'seo.seo': SeoSeo;
    }
  }
}
