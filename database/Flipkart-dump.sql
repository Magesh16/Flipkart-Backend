PGDMP     %                    {            Flipkart     15.2 (Ubuntu 15.2-1.pgdg20.04+1)     15.2 (Ubuntu 15.2-1.pgdg20.04+1) �               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24645    Flipkart    DATABASE     p   CREATE DATABASE "Flipkart" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_IN';
    DROP DATABASE "Flipkart";
                postgres    false                        3079    32923 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false                       0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �           1247    32983    address_type    TYPE     D   CREATE TYPE public.address_type AS ENUM (
    'Home',
    'Work'
);
    DROP TYPE public.address_type;
       public          postgres    false            �           1247    65898    delivery_status    TYPE     {   CREATE TYPE public.delivery_status AS ENUM (
    'OrderConfirmed',
    'shipped',
    'outForDelivery',
    'delivered'
);
 "   DROP TYPE public.delivery_status;
       public          postgres    false            ~           1247    32913    gender    TYPE     @   CREATE TYPE public.gender AS ENUM (
    'Male',
    'Female'
);
    DROP TYPE public.gender;
       public          postgres    false                       1255    32999    trigger_set_timestamp()    FUNCTION     �   CREATE FUNCTION public.trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;
 .   DROP FUNCTION public.trigger_set_timestamp();
       public          postgres    false            �            1259    32988    address    TABLE     t  CREATE TABLE public.address (
    id integer NOT NULL,
    user_id integer NOT NULL,
    locality character varying(30) NOT NULL,
    city character varying(30) NOT NULL,
    state character varying(30) NOT NULL,
    landmark character varying(30),
    alternate_phno character varying(20),
    address_type public.address_type NOT NULL,
    isdefault boolean NOT NULL
);
    DROP TABLE public.address;
       public         heap    postgres    false    897            �            1259    32987    address_id_seq    SEQUENCE     �   CREATE SEQUENCE public.address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.address_id_seq;
       public          postgres    false    219                        0    0    address_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;
          public          postgres    false    218            �            1259    57689 
   cart_order    TABLE     �   CREATE TABLE public.cart_order (
    id integer NOT NULL,
    product_items_id integer,
    quantity integer,
    order_id character varying(100)
);
    DROP TABLE public.cart_order;
       public         heap    postgres    false            �            1259    57688    cart_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.cart_order_id_seq;
       public          postgres    false    243            !           0    0    cart_order_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.cart_order_id_seq OWNED BY public.cart_order.id;
          public          postgres    false    242            �            1259    33011    category    TABLE     �   CREATE TABLE public.category (
    id integer NOT NULL,
    segment_id integer,
    name character varying(30),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.category;
       public         heap    postgres    false            �            1259    33010    category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.category_id_seq;
       public          postgres    false    223            "           0    0    category_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;
          public          postgres    false    222            �            1259    33026    category_type    TABLE     �   CREATE TABLE public.category_type (
    id integer NOT NULL,
    category_id integer,
    name character varying(30),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
 !   DROP TABLE public.category_type;
       public         heap    postgres    false            �            1259    33025    category_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.category_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.category_type_id_seq;
       public          postgres    false    225            #           0    0    category_type_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.category_type_id_seq OWNED BY public.category_type.id;
          public          postgres    false    224                       1259    82256    coupons    TABLE     2  CREATE TABLE public.coupons (
    id integer NOT NULL,
    voucher_code character varying(10),
    voucher_pin integer,
    min_price integer,
    discount_percentage integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.coupons;
       public         heap    postgres    false                        1259    82255    coupons_id_seq    SEQUENCE     �   CREATE SEQUENCE public.coupons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.coupons_id_seq;
       public          postgres    false    257            $           0    0    coupons_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.coupons_id_seq OWNED BY public.coupons.id;
          public          postgres    false    256            �            1259    65960    giftcard_variations    TABLE     $  CREATE TABLE public.giftcard_variations (
    id integer NOT NULL,
    giftcard_item_id integer,
    type character varying(50),
    value character varying(10),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
 '   DROP TABLE public.giftcard_variations;
       public         heap    postgres    false            �            1259    65959    giftcard_variations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.giftcard_variations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.giftcard_variations_id_seq;
       public          postgres    false    253            %           0    0    giftcard_variations_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.giftcard_variations_id_seq OWNED BY public.giftcard_variations.id;
          public          postgres    false    252            �            1259    65979    giftcarditems_review    TABLE     �   CREATE TABLE public.giftcarditems_review (
    id integer NOT NULL,
    giftcard_item_id integer,
    rating integer,
    comment character varying(100),
    user_id integer,
    likes_count integer DEFAULT 0,
    dislikes_count integer DEFAULT 0
);
 (   DROP TABLE public.giftcarditems_review;
       public         heap    postgres    false            �            1259    65978    giftcarditems_review_id_seq    SEQUENCE     �   CREATE SEQUENCE public.giftcarditems_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.giftcarditems_review_id_seq;
       public          postgres    false    255            &           0    0    giftcarditems_review_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.giftcarditems_review_id_seq OWNED BY public.giftcarditems_review.id;
          public          postgres    false    254            �            1259    65912 	   giftcards    TABLE     �   CREATE TABLE public.giftcards (
    id integer NOT NULL,
    name character varying(50),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.giftcards;
       public         heap    postgres    false            �            1259    65930    giftcards_category    TABLE     �   CREATE TABLE public.giftcards_category (
    id integer NOT NULL,
    giftcard_id integer,
    name character varying(50),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
 &   DROP TABLE public.giftcards_category;
       public         heap    postgres    false            �            1259    65929    giftcards_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.giftcards_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.giftcards_category_id_seq;
       public          postgres    false    249            '           0    0    giftcards_category_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.giftcards_category_id_seq OWNED BY public.giftcards_category.id;
          public          postgres    false    248            �            1259    65911    giftcards_id_seq    SEQUENCE     �   CREATE SEQUENCE public.giftcards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.giftcards_id_seq;
       public          postgres    false    247            (           0    0    giftcards_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.giftcards_id_seq OWNED BY public.giftcards.id;
          public          postgres    false    246            �            1259    65944    giftcards_item    TABLE     .  CREATE TABLE public.giftcards_item (
    id integer NOT NULL,
    giftcard_category_id integer,
    name character varying(50),
    mrp integer,
    discount integer,
    avail_offer character varying(100),
    highlights character varying(200),
    description character varying(1000),
    specification character varying(1000),
    image_url character varying(500),
    qty_in_stock integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    giftcart_variationid integer
);
 "   DROP TABLE public.giftcards_item;
       public         heap    postgres    false            �            1259    65943    giftcards_item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.giftcards_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.giftcards_item_id_seq;
       public          postgres    false    251            )           0    0    giftcards_item_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.giftcards_item_id_seq OWNED BY public.giftcards_item.id;
          public          postgres    false    250            �            1259    33055    pancard    TABLE     �   CREATE TABLE public.pancard (
    id integer NOT NULL,
    pan_number character varying(20) NOT NULL,
    full_name character varying(50) NOT NULL,
    image_url character varying(200) NOT NULL,
    user_id integer
);
    DROP TABLE public.pancard;
       public         heap    postgres    false            �            1259    33054    pancard_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pancard_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.pancard_id_seq;
       public          postgres    false    229            *           0    0    pancard_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.pancard_id_seq OWNED BY public.pancard.id;
          public          postgres    false    228            �            1259    41296    payment    TABLE     �   CREATE TABLE public.payment (
    id integer NOT NULL,
    user_id integer,
    status boolean,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    receipt_url text,
    transaction_id text NOT NULL,
    order_id character varying(100)
);
    DROP TABLE public.payment;
       public         heap    postgres    false            �            1259    41295    payment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.payment_id_seq;
       public          postgres    false    241            +           0    0    payment_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.payment_id_seq OWNED BY public.payment.id;
          public          postgres    false    240            �            1259    33154    product_cart    TABLE     )  CREATE TABLE public.product_cart (
    id integer NOT NULL,
    user_id integer,
    product_items_id integer,
    quantity integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT false
);
     DROP TABLE public.product_cart;
       public         heap    postgres    false            �            1259    33153    product_cart_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.product_cart_id_seq;
       public          postgres    false    237            ,           0    0    product_cart_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.product_cart_id_seq OWNED BY public.product_cart.id;
          public          postgres    false    236            �            1259    33040    product_items    TABLE     �  CREATE TABLE public.product_items (
    id integer NOT NULL,
    category_type_id integer,
    name character varying(300),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    mrp integer,
    discount character varying(10),
    f_assured boolean,
    avail_offer character varying[],
    delivery_pincode character varying(6),
    highlights character varying[],
    description character varying(1000),
    specification character varying(2000),
    image_url character varying[],
    qty_in_stock integer,
    variation_id integer,
    offers character varying(1000)[]
);
 !   DROP TABLE public.product_items;
       public         heap    postgres    false            �            1259    33039    product_items_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.product_items_id_seq;
       public          postgres    false    227            -           0    0    product_items_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.product_items_id_seq OWNED BY public.product_items.id;
          public          postgres    false    226            �            1259    33123    product_orders    TABLE     $  CREATE TABLE public.product_orders (
    id integer NOT NULL,
    status boolean,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer,
    order_id character varying(100),
    quantity integer
);
 "   DROP TABLE public.product_orders;
       public         heap    postgres    false            �            1259    33122    product_orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.product_orders_id_seq;
       public          postgres    false    235            .           0    0    product_orders_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.product_orders_id_seq OWNED BY public.product_orders.id;
          public          postgres    false    234            �            1259    33108    reviews    TABLE     �  CREATE TABLE public.reviews (
    id integer NOT NULL,
    product_items_id integer,
    rating integer NOT NULL,
    comment character varying(1000),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer,
    likes_count integer,
    dislikes_count integer,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            �            1259    33107    reviews_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.reviews_id_seq;
       public          postgres    false    233            /           0    0    reviews_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;
          public          postgres    false    232            �            1259    33001    segment    TABLE     �   CREATE TABLE public.segment (
    id integer NOT NULL,
    name character varying(30),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.segment;
       public         heap    postgres    false            �            1259    33000    segement_id_seq    SEQUENCE     �   CREATE SEQUENCE public.segement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.segement_id_seq;
       public          postgres    false    221            0           0    0    segement_id_seq    SEQUENCE OWNED BY     B   ALTER SEQUENCE public.segement_id_seq OWNED BY public.segment.id;
          public          postgres    false    220            �            1259    65886    shipment    TABLE     �   CREATE TABLE public.shipment (
    id integer NOT NULL,
    order_id character varying(30),
    user_id integer,
    tracking_num integer,
    delivery_date timestamp without time zone DEFAULT now() NOT NULL,
    delivery_status public.delivery_status
);
    DROP TABLE public.shipment;
       public         heap    postgres    false    942            �            1259    65885    shipment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.shipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.shipment_id_seq;
       public          postgres    false    245            1           0    0    shipment_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.shipment_id_seq OWNED BY public.shipment.id;
          public          postgres    false    244            �            1259    24683    userinfo    TABLE       CREATE TABLE public.userinfo (
    firstname character varying(20),
    lastname character varying(10),
    email character varying(50),
    mobilenum character varying NOT NULL,
    gender public.gender,
    token character varying,
    id integer NOT NULL
);
    DROP TABLE public.userinfo;
       public         heap    postgres    false    894            �            1259    32965    userinfo_id_seq    SEQUENCE     x   CREATE SEQUENCE public.userinfo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.userinfo_id_seq;
       public          postgres    false            �            1259    32967    userinfoid_seq    SEQUENCE     �   CREATE SEQUENCE public.userinfoid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.userinfoid_seq;
       public          postgres    false    215            2           0    0    userinfoid_seq    SEQUENCE OWNED BY     B   ALTER SEQUENCE public.userinfoid_seq OWNED BY public.userinfo.id;
          public          postgres    false    217            �            1259    33069 
   variations    TABLE     =  CREATE TABLE public.variations (
    id integer NOT NULL,
    product_items_id integer,
    type character varying(20),
    value character varying(10),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    colour character varying(30)
);
    DROP TABLE public.variations;
       public         heap    postgres    false            �            1259    33068    variations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.variations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.variations_id_seq;
       public          postgres    false    231            3           0    0    variations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.variations_id_seq OWNED BY public.variations.id;
          public          postgres    false    230            �            1259    33207    wishlist    TABLE     �   CREATE TABLE public.wishlist (
    id integer NOT NULL,
    user_id integer,
    product_items_id integer,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.wishlist;
       public         heap    postgres    false            �            1259    33206    wishlist_id_seq    SEQUENCE     �   CREATE SEQUENCE public.wishlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.wishlist_id_seq;
       public          postgres    false    239            4           0    0    wishlist_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.wishlist_id_seq OWNED BY public.wishlist.id;
          public          postgres    false    238            �           2604    32991 
   address id    DEFAULT     h   ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);
 9   ALTER TABLE public.address ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219                       2604    57692    cart_order id    DEFAULT     n   ALTER TABLE ONLY public.cart_order ALTER COLUMN id SET DEFAULT nextval('public.cart_order_id_seq'::regclass);
 <   ALTER TABLE public.cart_order ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    242    243    243            �           2604    33014    category id    DEFAULT     j   ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);
 :   ALTER TABLE public.category ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            �           2604    33029    category_type id    DEFAULT     t   ALTER TABLE ONLY public.category_type ALTER COLUMN id SET DEFAULT nextval('public.category_type_id_seq'::regclass);
 ?   ALTER TABLE public.category_type ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224    225                       2604    82259 
   coupons id    DEFAULT     h   ALTER TABLE ONLY public.coupons ALTER COLUMN id SET DEFAULT nextval('public.coupons_id_seq'::regclass);
 9   ALTER TABLE public.coupons ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    256    257    257                       2604    65963    giftcard_variations id    DEFAULT     �   ALTER TABLE ONLY public.giftcard_variations ALTER COLUMN id SET DEFAULT nextval('public.giftcard_variations_id_seq'::regclass);
 E   ALTER TABLE public.giftcard_variations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    252    253    253                       2604    65982    giftcarditems_review id    DEFAULT     �   ALTER TABLE ONLY public.giftcarditems_review ALTER COLUMN id SET DEFAULT nextval('public.giftcarditems_review_id_seq'::regclass);
 F   ALTER TABLE public.giftcarditems_review ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    254    255    255            	           2604    65915    giftcards id    DEFAULT     l   ALTER TABLE ONLY public.giftcards ALTER COLUMN id SET DEFAULT nextval('public.giftcards_id_seq'::regclass);
 ;   ALTER TABLE public.giftcards ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    247    246    247                       2604    65933    giftcards_category id    DEFAULT     ~   ALTER TABLE ONLY public.giftcards_category ALTER COLUMN id SET DEFAULT nextval('public.giftcards_category_id_seq'::regclass);
 D   ALTER TABLE public.giftcards_category ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    249    248    249                       2604    65947    giftcards_item id    DEFAULT     v   ALTER TABLE ONLY public.giftcards_item ALTER COLUMN id SET DEFAULT nextval('public.giftcards_item_id_seq'::regclass);
 @   ALTER TABLE public.giftcards_item ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    250    251    251            �           2604    33058 
   pancard id    DEFAULT     h   ALTER TABLE ONLY public.pancard ALTER COLUMN id SET DEFAULT nextval('public.pancard_id_seq'::regclass);
 9   ALTER TABLE public.pancard ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    228    229                       2604    41299 
   payment id    DEFAULT     h   ALTER TABLE ONLY public.payment ALTER COLUMN id SET DEFAULT nextval('public.payment_id_seq'::regclass);
 9   ALTER TABLE public.payment ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    241    240    241            �           2604    33157    product_cart id    DEFAULT     r   ALTER TABLE ONLY public.product_cart ALTER COLUMN id SET DEFAULT nextval('public.product_cart_id_seq'::regclass);
 >   ALTER TABLE public.product_cart ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    236    237            �           2604    33043    product_items id    DEFAULT     t   ALTER TABLE ONLY public.product_items ALTER COLUMN id SET DEFAULT nextval('public.product_items_id_seq'::regclass);
 ?   ALTER TABLE public.product_items ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    227    227            �           2604    33126    product_orders id    DEFAULT     v   ALTER TABLE ONLY public.product_orders ALTER COLUMN id SET DEFAULT nextval('public.product_orders_id_seq'::regclass);
 @   ALTER TABLE public.product_orders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    235    234    235            �           2604    33111 
   reviews id    DEFAULT     h   ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);
 9   ALTER TABLE public.reviews ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    233    232    233            �           2604    33004 
   segment id    DEFAULT     i   ALTER TABLE ONLY public.segment ALTER COLUMN id SET DEFAULT nextval('public.segement_id_seq'::regclass);
 9   ALTER TABLE public.segment ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221                       2604    65889    shipment id    DEFAULT     j   ALTER TABLE ONLY public.shipment ALTER COLUMN id SET DEFAULT nextval('public.shipment_id_seq'::regclass);
 :   ALTER TABLE public.shipment ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    245    245            �           2604    32968    userinfo id    DEFAULT     i   ALTER TABLE ONLY public.userinfo ALTER COLUMN id SET DEFAULT nextval('public.userinfoid_seq'::regclass);
 :   ALTER TABLE public.userinfo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    215            �           2604    33072    variations id    DEFAULT     n   ALTER TABLE ONLY public.variations ALTER COLUMN id SET DEFAULT nextval('public.variations_id_seq'::regclass);
 <   ALTER TABLE public.variations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    230    231                       2604    33210    wishlist id    DEFAULT     j   ALTER TABLE ONLY public.wishlist ALTER COLUMN id SET DEFAULT nextval('public.wishlist_id_seq'::regclass);
 :   ALTER TABLE public.wishlist ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    239    238    239            �          0    32988    address 
   TABLE DATA           x   COPY public.address (id, user_id, locality, city, state, landmark, alternate_phno, address_type, isdefault) FROM stdin;
    public          postgres    false    219   ��       
          0    57689 
   cart_order 
   TABLE DATA           N   COPY public.cart_order (id, product_items_id, quantity, order_id) FROM stdin;
    public          postgres    false    243   ��       �          0    33011    category 
   TABLE DATA           P   COPY public.category (id, segment_id, name, created_at, updated_at) FROM stdin;
    public          postgres    false    223   �       �          0    33026    category_type 
   TABLE DATA           V   COPY public.category_type (id, category_id, name, created_at, updated_at) FROM stdin;
    public          postgres    false    225   U�                 0    82256    coupons 
   TABLE DATA           x   COPY public.coupons (id, voucher_code, voucher_pin, min_price, discount_percentage, created_at, updated_at) FROM stdin;
    public          postgres    false    257   ��                 0    65960    giftcard_variations 
   TABLE DATA           h   COPY public.giftcard_variations (id, giftcard_item_id, type, value, created_at, updated_at) FROM stdin;
    public          postgres    false    253   �                 0    65979    giftcarditems_review 
   TABLE DATA           {   COPY public.giftcarditems_review (id, giftcard_item_id, rating, comment, user_id, likes_count, dislikes_count) FROM stdin;
    public          postgres    false    255   ��                 0    65912 	   giftcards 
   TABLE DATA           E   COPY public.giftcards (id, name, created_at, updated_at) FROM stdin;
    public          postgres    false    247   �                 0    65930    giftcards_category 
   TABLE DATA           [   COPY public.giftcards_category (id, giftcard_id, name, created_at, updated_at) FROM stdin;
    public          postgres    false    249   d�                 0    65944    giftcards_item 
   TABLE DATA           �   COPY public.giftcards_item (id, giftcard_category_id, name, mrp, discount, avail_offer, highlights, description, specification, image_url, qty_in_stock, created_at, updated_at, giftcart_variationid) FROM stdin;
    public          postgres    false    251   ��       �          0    33055    pancard 
   TABLE DATA           P   COPY public.pancard (id, pan_number, full_name, image_url, user_id) FROM stdin;
    public          postgres    false    229   a�                 0    41296    payment 
   TABLE DATA           i   COPY public.payment (id, user_id, status, created_at, receipt_url, transaction_id, order_id) FROM stdin;
    public          postgres    false    241   �                 0    33154    product_cart 
   TABLE DATA           o   COPY public.product_cart (id, user_id, product_items_id, quantity, created_at, updated_at, status) FROM stdin;
    public          postgres    false    237   �       �          0    33040    product_items 
   TABLE DATA           �   COPY public.product_items (id, category_type_id, name, created_at, updated_at, mrp, discount, f_assured, avail_offer, delivery_pincode, highlights, description, specification, image_url, qty_in_stock, variation_id, offers) FROM stdin;
    public          postgres    false    227   0�                 0    33123    product_orders 
   TABLE DATA           i   COPY public.product_orders (id, status, created_at, updated_at, user_id, order_id, quantity) FROM stdin;
    public          postgres    false    235   O                 0    33108    reviews 
   TABLE DATA           �   COPY public.reviews (id, product_items_id, rating, comment, created_at, updated_at, user_id, likes_count, dislikes_count) FROM stdin;
    public          postgres    false    233   Z      �          0    33001    segment 
   TABLE DATA           C   COPY public.segment (id, name, created_at, updated_at) FROM stdin;
    public          postgres    false    221   �                0    65886    shipment 
   TABLE DATA           g   COPY public.shipment (id, order_id, user_id, tracking_num, delivery_date, delivery_status) FROM stdin;
    public          postgres    false    245   �      �          0    24683    userinfo 
   TABLE DATA           \   COPY public.userinfo (firstname, lastname, email, mobilenum, gender, token, id) FROM stdin;
    public          postgres    false    215   '      �          0    33069 
   variations 
   TABLE DATA           g   COPY public.variations (id, product_items_id, type, value, created_at, updated_at, colour) FROM stdin;
    public          postgres    false    231   �                0    33207    wishlist 
   TABLE DATA           W   COPY public.wishlist (id, user_id, product_items_id, createdat, updatedat) FROM stdin;
    public          postgres    false    239   �      5           0    0    address_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.address_id_seq', 6, true);
          public          postgres    false    218            6           0    0    cart_order_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.cart_order_id_seq', 27, true);
          public          postgres    false    242            7           0    0    category_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.category_id_seq', 46, true);
          public          postgres    false    222            8           0    0    category_type_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.category_type_id_seq', 111, true);
          public          postgres    false    224            9           0    0    coupons_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.coupons_id_seq', 3, true);
          public          postgres    false    256            :           0    0    giftcard_variations_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.giftcard_variations_id_seq', 3, true);
          public          postgres    false    252            ;           0    0    giftcarditems_review_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.giftcarditems_review_id_seq', 4, true);
          public          postgres    false    254            <           0    0    giftcards_category_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.giftcards_category_id_seq', 3, true);
          public          postgres    false    248            =           0    0    giftcards_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.giftcards_id_seq', 3, true);
          public          postgres    false    246            >           0    0    giftcards_item_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.giftcards_item_id_seq', 3, true);
          public          postgres    false    250            ?           0    0    pancard_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.pancard_id_seq', 21, true);
          public          postgres    false    228            @           0    0    payment_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.payment_id_seq', 25, true);
          public          postgres    false    240            A           0    0    product_cart_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.product_cart_id_seq', 28, true);
          public          postgres    false    236            B           0    0    product_items_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.product_items_id_seq', 8, true);
          public          postgres    false    226            C           0    0    product_orders_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.product_orders_id_seq', 27, true);
          public          postgres    false    234            D           0    0    reviews_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.reviews_id_seq', 7, true);
          public          postgres    false    232            E           0    0    segement_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.segement_id_seq', 11, true);
          public          postgres    false    220            F           0    0    shipment_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.shipment_id_seq', 2, true);
          public          postgres    false    244            G           0    0    userinfo_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.userinfo_id_seq', 1, false);
          public          postgres    false    216            H           0    0    userinfoid_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.userinfoid_seq', 16, true);
          public          postgres    false    217            I           0    0    variations_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.variations_id_seq', 16, true);
          public          postgres    false    230            J           0    0    wishlist_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.wishlist_id_seq', 6, true);
          public          postgres    false    238                       2606    32993    address address_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.address DROP CONSTRAINT address_pkey;
       public            postgres    false    219            9           2606    57694    cart_order cart_order_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.cart_order
    ADD CONSTRAINT cart_order_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.cart_order DROP CONSTRAINT cart_order_pkey;
       public            postgres    false    243            #           2606    33018    category category_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public            postgres    false    223            %           2606    33033     category_type category_type_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.category_type
    ADD CONSTRAINT category_type_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.category_type DROP CONSTRAINT category_type_pkey;
       public            postgres    false    225            G           2606    82261    coupons coupons_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.coupons DROP CONSTRAINT coupons_pkey;
       public            postgres    false    257            C           2606    65967 ,   giftcard_variations giftcard_variations_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.giftcard_variations
    ADD CONSTRAINT giftcard_variations_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.giftcard_variations DROP CONSTRAINT giftcard_variations_pkey;
       public            postgres    false    253            E           2606    65984 .   giftcarditems_review giftcarditems_review_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.giftcarditems_review
    ADD CONSTRAINT giftcarditems_review_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.giftcarditems_review DROP CONSTRAINT giftcarditems_review_pkey;
       public            postgres    false    255            ?           2606    65937 *   giftcards_category giftcards_category_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.giftcards_category
    ADD CONSTRAINT giftcards_category_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.giftcards_category DROP CONSTRAINT giftcards_category_pkey;
       public            postgres    false    249            A           2606    65953 "   giftcards_item giftcards_item_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.giftcards_item
    ADD CONSTRAINT giftcards_item_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.giftcards_item DROP CONSTRAINT giftcards_item_pkey;
       public            postgres    false    251            =           2606    65919    giftcards giftcards_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.giftcards
    ADD CONSTRAINT giftcards_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.giftcards DROP CONSTRAINT giftcards_pkey;
       public            postgres    false    247            )           2606    33060    pancard pancard_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.pancard
    ADD CONSTRAINT pancard_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.pancard DROP CONSTRAINT pancard_pkey;
       public            postgres    false    229            7           2606    41302    payment payment_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.payment DROP CONSTRAINT payment_pkey;
       public            postgres    false    241            3           2606    33161    product_cart product_cart_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.product_cart
    ADD CONSTRAINT product_cart_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.product_cart DROP CONSTRAINT product_cart_pkey;
       public            postgres    false    237            '           2606    33047     product_items product_items_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.product_items
    ADD CONSTRAINT product_items_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.product_items DROP CONSTRAINT product_items_pkey;
       public            postgres    false    227            1           2606    33128 "   product_orders product_orders_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.product_orders
    ADD CONSTRAINT product_orders_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.product_orders DROP CONSTRAINT product_orders_pkey;
       public            postgres    false    235            /           2606    33116    reviews reviews_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    233            !           2606    33008    segment segement_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.segment
    ADD CONSTRAINT segement_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public.segment DROP CONSTRAINT segement_pkey;
       public            postgres    false    221            ;           2606    65891    shipment shipment_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.shipment
    ADD CONSTRAINT shipment_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.shipment DROP CONSTRAINT shipment_pkey;
       public            postgres    false    245            +           2606    33067    pancard user_id_unique 
   CONSTRAINT     T   ALTER TABLE ONLY public.pancard
    ADD CONSTRAINT user_id_unique UNIQUE (user_id);
 @   ALTER TABLE ONLY public.pancard DROP CONSTRAINT user_id_unique;
       public            postgres    false    229                       2606    32973    userinfo userinfo_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.userinfo
    ADD CONSTRAINT userinfo_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.userinfo DROP CONSTRAINT userinfo_pkey;
       public            postgres    false    215            -           2606    33076    variations variations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.variations
    ADD CONSTRAINT variations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.variations DROP CONSTRAINT variations_pkey;
       public            postgres    false    231            5           2606    33214    wishlist wishlist_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.wishlist DROP CONSTRAINT wishlist_pkey;
       public            postgres    false    239            _           2620    33024    category set_timestamp    TRIGGER     |   CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.category FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
 /   DROP TRIGGER set_timestamp ON public.category;
       public          postgres    false    223    268            ^           2620    33009    segment set_timestamp    TRIGGER     {   CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.segment FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
 .   DROP TRIGGER set_timestamp ON public.segment;
       public          postgres    false    268    221            V           2606    57700 +   cart_order cart_order_product_items_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_order
    ADD CONSTRAINT cart_order_product_items_id_fkey FOREIGN KEY (product_items_id) REFERENCES public.product_items(id);
 U   ALTER TABLE ONLY public.cart_order DROP CONSTRAINT cart_order_product_items_id_fkey;
       public          postgres    false    3367    243    227            I           2606    33019 !   category category_segment_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_segment_id_fkey FOREIGN KEY (segment_id) REFERENCES public.segment(id);
 K   ALTER TABLE ONLY public.category DROP CONSTRAINT category_segment_id_fkey;
       public          postgres    false    223    221    3361            J           2606    33034 ,   category_type category_type_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.category_type
    ADD CONSTRAINT category_type_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id);
 V   ALTER TABLE ONLY public.category_type DROP CONSTRAINT category_type_category_id_fkey;
       public          postgres    false    223    3363    225            H           2606    32994    address fk_address_userinfo    FK CONSTRAINT     }   ALTER TABLE ONLY public.address
    ADD CONSTRAINT fk_address_userinfo FOREIGN KEY (user_id) REFERENCES public.userinfo(id);
 E   ALTER TABLE ONLY public.address DROP CONSTRAINT fk_address_userinfo;
       public          postgres    false    219    3357    215            [           2606    65968 =   giftcard_variations giftcard_variations_giftcard_item_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.giftcard_variations
    ADD CONSTRAINT giftcard_variations_giftcard_item_id_fkey FOREIGN KEY (giftcard_item_id) REFERENCES public.giftcards_item(id);
 g   ALTER TABLE ONLY public.giftcard_variations DROP CONSTRAINT giftcard_variations_giftcard_item_id_fkey;
       public          postgres    false    253    3393    251            \           2606    65985 ?   giftcarditems_review giftcarditems_review_giftcard_item_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.giftcarditems_review
    ADD CONSTRAINT giftcarditems_review_giftcard_item_id_fkey FOREIGN KEY (giftcard_item_id) REFERENCES public.giftcards_item(id);
 i   ALTER TABLE ONLY public.giftcarditems_review DROP CONSTRAINT giftcarditems_review_giftcard_item_id_fkey;
       public          postgres    false    255    251    3393            ]           2606    65990 6   giftcarditems_review giftcarditems_review_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.giftcarditems_review
    ADD CONSTRAINT giftcarditems_review_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.userinfo(id);
 `   ALTER TABLE ONLY public.giftcarditems_review DROP CONSTRAINT giftcarditems_review_user_id_fkey;
       public          postgres    false    3357    215    255            X           2606    65938 6   giftcards_category giftcards_category_giftcard_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.giftcards_category
    ADD CONSTRAINT giftcards_category_giftcard_id_fkey FOREIGN KEY (giftcard_id) REFERENCES public.giftcards(id);
 `   ALTER TABLE ONLY public.giftcards_category DROP CONSTRAINT giftcards_category_giftcard_id_fkey;
       public          postgres    false    247    3389    249            Y           2606    65954 7   giftcards_item giftcards_item_giftcard_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.giftcards_item
    ADD CONSTRAINT giftcards_item_giftcard_category_id_fkey FOREIGN KEY (giftcard_category_id) REFERENCES public.giftcards_category(id);
 a   ALTER TABLE ONLY public.giftcards_item DROP CONSTRAINT giftcards_item_giftcard_category_id_fkey;
       public          postgres    false    249    251    3391            Z           2606    65973 7   giftcards_item giftcards_item_giftcart_variationid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.giftcards_item
    ADD CONSTRAINT giftcards_item_giftcart_variationid_fkey FOREIGN KEY (giftcart_variationid) REFERENCES public.giftcard_variations(id);
 a   ALTER TABLE ONLY public.giftcards_item DROP CONSTRAINT giftcards_item_giftcart_variationid_fkey;
       public          postgres    false    253    251    3395            L           2606    33061    pancard pancard_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pancard
    ADD CONSTRAINT pancard_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.userinfo(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.pancard DROP CONSTRAINT pancard_user_id_fkey;
       public          postgres    false    215    3357    229            U           2606    41308    payment payment_user_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.userinfo(id);
 F   ALTER TABLE ONLY public.payment DROP CONSTRAINT payment_user_id_fkey;
       public          postgres    false    241    215    3357            Q           2606    33167 /   product_cart product_cart_product_items_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_cart
    ADD CONSTRAINT product_cart_product_items_id_fkey FOREIGN KEY (product_items_id) REFERENCES public.product_items(id);
 Y   ALTER TABLE ONLY public.product_cart DROP CONSTRAINT product_cart_product_items_id_fkey;
       public          postgres    false    237    227    3367            R           2606    33162 &   product_cart product_cart_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_cart
    ADD CONSTRAINT product_cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.userinfo(id);
 P   ALTER TABLE ONLY public.product_cart DROP CONSTRAINT product_cart_user_id_fkey;
       public          postgres    false    237    215    3357            K           2606    33048 1   product_items product_items_category_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_items
    ADD CONSTRAINT product_items_category_type_id_fkey FOREIGN KEY (category_type_id) REFERENCES public.category_type(id);
 [   ALTER TABLE ONLY public.product_items DROP CONSTRAINT product_items_category_type_id_fkey;
       public          postgres    false    227    3365    225            P           2606    33148 *   product_orders product_orders_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_orders
    ADD CONSTRAINT product_orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.userinfo(id);
 T   ALTER TABLE ONLY public.product_orders DROP CONSTRAINT product_orders_user_id_fkey;
       public          postgres    false    3357    235    215            N           2606    33117 %   reviews reviews_product_items_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_items_id_fkey FOREIGN KEY (product_items_id) REFERENCES public.product_items(id);
 O   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_product_items_id_fkey;
       public          postgres    false    233    227    3367            O           2606    33139    reviews reviews_user_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.userinfo(id);
 F   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_user_id_fkey;
       public          postgres    false    3357    215    233            W           2606    65892    shipment shipment_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.shipment
    ADD CONSTRAINT shipment_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.userinfo(id);
 H   ALTER TABLE ONLY public.shipment DROP CONSTRAINT shipment_user_id_fkey;
       public          postgres    false    215    3357    245            M           2606    33077 +   variations variations_product_items_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.variations
    ADD CONSTRAINT variations_product_items_id_fkey FOREIGN KEY (product_items_id) REFERENCES public.product_items(id);
 U   ALTER TABLE ONLY public.variations DROP CONSTRAINT variations_product_items_id_fkey;
       public          postgres    false    231    3367    227            S           2606    33220 '   wishlist wishlist_product_items_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_product_items_id_fkey FOREIGN KEY (product_items_id) REFERENCES public.product_items(id);
 Q   ALTER TABLE ONLY public.wishlist DROP CONSTRAINT wishlist_product_items_id_fkey;
       public          postgres    false    239    227    3367            T           2606    33215    wishlist wishlist_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.userinfo(id);
 H   ALTER TABLE ONLY public.wishlist DROP CONSTRAINT wishlist_user_id_fkey;
       public          postgres    false    215    3357    239            �   �   x�eα�0���}cQ��,&$����4�ZR�ѷb�.�����Rȣ�h}�M����%�%a�WdYG�#�2�O��Rg���C#��f&Ȑw�������K2Zp�L0�t�=�ֻQnQCl�ɉx��u�
��wro������CeP������F�wB��GO�      
   >   x�]���0��3��0���|O:&�֐�������E�V�b��D6�W��}D�ma      �   C  x���Mo�6@Ϛ_�S.m	��[��uZ�IY{�E�/�����q��;r��IX`z|�3����u:�sC��/��J�I�)%��A럤��! ���}=�|����yuF��)��� (�����c?�����8�UGAHD��l� �l�=������q�N�ԏC��!���������2�
.c����J
2 ��fߟi�m�����*�i)��Ub� @d��4��x��4�q��u�!�jI5� $�~���t�~�r��V*Ԧ,� @��?�2���N��8/I*� �F5o�i����⡓V8
Z��/ -���S[�
�-V6�б�ʹ,ӗ�P�J��� �Y�O��Rs����
Xv��4Td\�j'g������:�S�&���͞�o�Ә/Q(��:�+<�4Kw�x��ȴv�I�� @f�����5(�RޕJ Y������-�;D���ޖ� ���pn/�Ӳ��|'�+-֤ ȳ��4_��Ar!��u �5�����~9^N��Rֲ��̓��A+��� ����x����%W٫ E�a�-�I
H�p�R�}n�?_L���uR�jwq����8 �[�G9 J�;����$�5�<����jt�Ri �|��v�Ө�-h�ӓ-7� eY��nӹT<m�!eT%� ʱ�]�����G�rWʂ�ۗ��Y��kv�i^�2[�0_���Q�e ���˿�<�sl?�e�_��+�$���)� В�<�o���9�K*�����;L������O7�W�_w��x���[�HXID�&6��cQ��_�j��Q �?Kp      �   :	  x���Ys�FǟџO�l�;��7��J\��z�D�-�A������M+N=���;��8G���d�[j�]��P���?�a%�ʈ�%����+-�V 
a��_:U��z%d��j��?��u�;��\�M�}`�JU��]ק��=���¬�m��B�<�	�!�uj���qH������fƶ+��6�G���!Mg��)T���XK�� �?���޴�6�ԡ��+�Kȅ b���������7��L�J�k8�"� �����^ԏ���ӱ��]p&& )���H���ʄFJ�/!��2�پ��n'��+�� m�$�Ԉ�M���n�X�7m��������b����U�#��v?���Z�^)�(���Y*���֫c�?�/��k�nS���a�ߎ�vAВ��:�LR�t�������q����qHO?�N����Ѕ����B��i���9M��󥉢@Ψ�#�� #�����8�{��@	�v�v|@��3�F�(d>�r(Yal���0�^��4�\�㌱��bP����Ȕ��X�b�v� �&����L�5Ij��Q���׽oS}�X�����B���Pjk�f�ϩ��s�Eڟ�V��0(G\��ӷrѫ���Ï��\-�.�[�X�l鄙 ��xs�6i��u���?0l;j���>zU8& ~٧�<a���晥K4��QFiY�0& �!f0��i>����6�1�R*W3& � [�cۗ�V4RU8��sВ��Ʃݕ����(S�_& �Nоۿ���B�E&�*5. �a檛��nb͑+���ϗ3��!ܷm��~�+J����v;y&������B�^�z�Z�FP,:L�&�A\ ��i�7�x<$�s��M�v\�5�����=���(at�H� 4�Q�����'j$u�[��'��`ߴ�O��&u�T,Ma��0��
YBB9�]p2J3��؉���in��8���佇�h�]��&��X�&�h!mq�C��}�ڡcD�]X�X�& ����Φ��,iU�^��`�޵�ܱdfNCR���.���[߷�t�Zv�8%ᔈS���. �s��r��ۘhc���;y����V0��۫X�& +�{1�á�&��ڞ[)�����p�L VV��C˝�#�HUy�XE��)�9�m��خi��j�ݦ�G~3�JgPј"n! k*캞��C�����Ä-�p& k	���PK��V���`A�Ƒ_JX	��T(\1�Őq�K�����~�Rߧ��bpX+M,�o& ��z����&`�Z�� l$�)m:�_ϡ�Fk+B��08��R�b�J��JU�	�I>���LZ�+��I��JL N{��qF1�eC(�pK�k�8��:|��]�58�L�0� �!���s)9�{;�ta�p��^�����V�� �-���pW�:wwc���Sǣq��+{��S�Xc�V��LQ�����4X�����u��X�ą \�PV޺$-Mi.�����y���Q^D��(. /�[ܼZ)���l�m�W����qN��8�ӈ}���V�W�]m]a���ؗ�㦝�qh������ba�L �x=~�D,��
_xa��m���E�����z�Z�|����x�ݞ=ǆ��ЇqxO����Ƒ^mr#궼����C���;>�YCn�����G�ݴ�5F1aƹ��0qZ��q"�?e��P��:�BO�0����)��Ǐ�iiX�V*SX,@Pļ�(*)�p�c��0�sMȳ�i���XLT��j� `���z��l�7Gl���M�@�D}{6�H��c�(�aVȜL ����dO%�����9�:K��}ʤv���٫R�d���4�t<r�k\���T.�OK��!3�[��;�P�3@����s�43jKJw�埰�N1c�'��-�F&���x�������ZR��
��1XBu>u��d)��� �+4.L ����yn��Hb���ą �=��q�g2w�oM���TsDl��iۍ�����~����1�H���T�=�_��T_=���p[2��,'��xq���ᐒ!Jܛ"[�s��2���x�~/����t\:����FD#�e6' )�oR���
�:=No�r�Fs��ؚc��~B�	�/�~?n�sq��e՘��_zsd����e����~�'��*��!���~7ac����Ha�/��	n����;��p�*��A��	n+��K�e�a���/-w�ӧFm��49rq_n�m�u��6�ڔ�"=!���5��Ƹ�(m.e��{  �pdW         o   x���1�0D��>��h���p��i���� ��y����9% �8�+�ZY�:Z����(�At�5P�I�`1����mi����9P�y��|cì�$�������7���m/?         }   x�����0g�)ثF�'��c�t`�@���"k�%$����10��x�}{�G�0
]IW�ssnt-\�8��@��L㦝4�����3 t�Y�KP�\{в�?��gn����^�-=^�         F   x�3�4�4���KI-J+�Q((�O)M.�44�4�4�2K;�&Ve�+ $�\Ƹ� ��������� ��!~         S   x�3�t�,*�HI��4202�50�54Q04�2��24�3�421�60�26 $�e�阗�Y�ZT�XD�iƜ!E�e�9���� ®0Q         g   x��̻@0 ��ޯ�.��(�+�6K�H� ���]"&��a`�t�1_�O[��a��-IKv�9��VZ�)�
J� �[Aa�����j㸮����"��_=q         v  x��U͎�6>�O1С�Z�~lg�@��6�$@R��-�$�$�KR�
��z����I2���Y	 @Ԇs8��~�Q��oW-��x�-��%�,��tl��6H������P�t�0� �~�-00�V�S�`�ٳ��BJ
�������S�,���*+5�p��R��P��+�y�ԉu��.�Y3Q��p�.!|7)����y
4ػ�k�­�PȞf�v\xd/��(�f�cx4�*�[����ާq��ۂzŅ�W�g5����ny��<>�%��A�R�zGR�n�u�K�z�j%���e|��v��(ɣti���]�ƛ�ų���d�˓�'��,Ⱦ�T���n�'�}��V��?��c[4S��z~�ӳ�a�]����y�ޜ7�L�"��w��l��iC.���%�و���������z���l�N�-Rw���ZI�m4��,�J-U$�
���y���y�:�bR��$80a��r	ԃ�� �����X�B�}_*��F�@c�	��\,�����%EE'I�k8x3&�<�3Q#H�X%�3bË�?�r���C�z:{���?��R6R:<Du(�F�����-�!]Ȱ4���0��Ǉ?)�IQ{	\���Ń�|�)x��
Ύ(����i`d��cR���1����H-bq%��*�Q��b=�&h��=����K��A�RF:�i�;i�\��U�[C��|�i�oOڙ��N �l��L׃��߻^;��QO	G��,_4���b�������􉴿^K0�Bb���������ȕ��uE�<��l=D7��L!����7�!��@P"?�̡�T�tQ���q���ɈYov�E|�\dYvv�I��?4�f������b�X4�      �   �   x�����   �3<��d綶6�����������ݿ��3p����)�A%,��2�3Ƴ	H�.�v�sB�X[�wf�����8N��H!��%�/��ԙW��g1lҭ,G��Üg��@�TgR��;.HI�ݯ��:ZլI�^_B�0eJo         �  x���ɒ�@ ��3>��S`/,�M�֑E���T��B+��gL25f�z�o_�p�A�c� ��@����%AD���4�ce���%턚U�2�Eޯ�u�/Y}�yrb}c���)�e�6d�Qy�H�~�l�&W����p��|jv(u,��WK{�g�:�L�+|����Q:�t7�R���$Gɒ�-��˄c��;v3|$�1����!-���A����jaM� ���z��jߵ���C+��w��	�i ڊ[ŕ^��V�ÍNޕ�����2�(J�8�G�>�j�}j!�/V �Т����5�5�
cI���NyП�,�K�����@�V�JI��
���g'#�L�}Z�y(Zˋ��|MX�Z��9���[1�������Ţ&"A�PQ�gh������}�hߵ��!�`�P�S%F��~!2d�3��f��8ޭ)7�\Fэ$g�W�x����Xr��u�0|{�~z���a$�            x������ � �      �      x��\�r�ƒ�-?Ŭ���Ox�d���$[�YS��('�?C`@�͸P�W��-���:y����M�b���s��-� �==�3�u7`�~pe��0\�:=���r���h�[�~�Ui�k=�Z�ߨ���������Az������d��e�������4K�Z�.�7�8��	X�D���XƖ��e�H��IKk=��A��Ks*�@���h*�T�n"�ݏ[F�2]л�]S��T�yK"�"�!�?��p��w�pR�y�U3̢0xAĳ�Ht�Vfj^�Ǘk=�p�Б;U��w12�0U11	�k�GN�7uV�_ʅx-��%)u.��� ����s��ĩ;�������l�EL�[��i��0����ɺ�A�TĈz'��E�%��3�zr�/�'��Gq�A�2��W�Dޡ�"�bLN�"�����<qΔ?F�����qmqz$�C�0�]>xC/���o#0k��#p`�+��0}�]iwH��U���N����/Oĉ�D�\P�Zwx)���16_a�A��S�b�7?�v-�]�����e�-p��Br���)Nѱ���M�W��r�*I�#y��/�,N�7�ޒ���d���.!�e�ޅ�g���*�7!a'>D9a��ﾣ��0wq縦��f��R�n廁U{��6Q2�b�T�5Y��8�Y�r%if�X|�G�;�do�u�Cq��ئ>Mɱ���SG�"
�0*�E<(K��0�(��74X9�T�-K��բ�-J��?^p�2��.i���aݤ��1F�t@��3v�/��N��'�/�T���5I�b0�uI�T�B1x��0V%�&���#5f�IT��-e�*N��_ڤ��H>~��2s�ZJ�0b\_�����>B�]B�C���i�`�Y��]_ڠ�)'ʽW̝��)�MR�v�a^�f�N^���y�Y���z텸�`A�,DO���Z���/�0�W,ߵ�1�b��XM�]��H�1Z���{n�h�W���bIZ�
�b�B{�aK��!u����C��P5qAz5�,"�
���E_�|x@�8
���3P�䕴J_��A!e�������|(^�*l�a��F-� -�h���Z�-'���˄�5c�ZRt���ʃ(�\(w����vX�)k?��ЂP/2Z���ǣ�����з�_���e+��z��tz!݅u�4u�&)m}�,�5׋�Z���J�89ov��vF�����ص�@��0�ſӽ��af:	�ty����8�5`�i?*N��S�2����sIb���e�wL�
6}9%;~~zX	��r���e�Y.LEũ�e[]^�qceJ6/�x8����^z1x����J�޼���]��X:Ѯu���������w�*_K�?o��h5��Ҕ�س &�!�2�m�$Ŝ��+�\y�F�b�>�������-�\��xn�����I
U���N�tm-��%<��.z�g��x��\���|�f��h��ʧqVB1���e?�v�-��>��3���.�����`�^���,��JK��ݓj+3$�A�����W�z��F����.����(��~[���N�>:��a�T�:9�#�=B�#�=���<5?j�j�T��y���m�T���}}n����������N�FI�Z��)�`�7*ϝ�XA*��U�F����Z����+P�iuR��r���W��RΧ�r:�&=�r)��i$������r
u�p�)XㅼM�Qb[O����U��η)�u[�����fO�@bZQ��w)@Jv��ٝ�O>�B���9�iY�b}	
w�t��b������{B�uB��b��h�%��B������'К��s��냡�k����v!���ҲSB `L�ʠi��_�?�pe=�����}����[F�hu������A�~c�Xn��a��6�.R� |żM��'~���-<��	7w*P'��<@����;�?��� �&!�|S��rW�/UB����}x��� 	�M����D|�mN�J��R�C�� � ����_�q7M	�(��Sf����I��c�D�а��fH�$`S�o�W�r����{�T�vm']se�+������I8��#�^Pw������-���ȳ�F�����	n���5+<��kh���w�/J�� ��D5���=)���bgf'���(��<?Y`^Pػg��.ck�'��'<�k����f�@�9�}D�
� %��`Ky��AN�,w�	\n#�*�m"<�;���-�d �lv�2m��f$`�;�S� ���i,$E6H߀��;I5_`{��;RAE	�J��B��G���#��.�|�G��`7�<���#���p����2U��	V�h1��M�,^A5J��)_h����x)�5�|"�)0�<_ _�_��4�K��&d>�n7ڭ�� t�
;nD�W��@�z� �T�k���l�{�!Q�Q�@����GP.!\��1��d���v�S�R^l��P`>t��
���jW{��c`0�$"����c���^��X��4#��^��n}���cl�1����m?}ཡ��~拣�g���e���0���'����]�~���%='0�"��x��0��t2���_�7>����C���B���j��Z�����!��:F�իG��Q�zԭ��__���|��_G�� �y�F�p����~��2Z�,��N���(��4� -��Q:�j�?�jЪ���RLB��j�G�O���I�] �\o��iԝ�T���y0��߫��Ɏ���d�n�|
x�迁����wc'�N�����;�?w�4X<%���Xu�o�|�����~������S>i�ͣf7�j@����'�Z�q8 2wc+���mC�Z���Rg�.�|_��b ct��$�%6,!��'�|xwB<�Tc�k�<4 :��E������B����^��hb��|���h�zͧ��h�`�Y���Ei�犧S��EJ�z����i |8�<a�B�!f�hQ�s���z���B}�#�XN�]��]�U�+ԪPa�<�"��'��������jQ��Y���v"�C�ϣoY �/hiq��i÷uIp���)�a
J$��P�����8ĠJ�y����H(�3�����n������+9Os��GԈ�Ӻ�"tQ�b&*�<͋
�ܸQT��	�ù\l�kN 7�^����B��!r��Mp�x�ex�J���������uq Y���_�I*�l�	e�emC���EɆ� [�C��[8nC��0��Y���#��(`�f^Qٜ�e D��`1*�\�7�t:gW#(eH�LTZtz�zD�(f6��@��Q�b�4;�Xq�P�g�g�6ƨ�m⩹�n�9���q/(f�n�>��XQ�J�XC�y"qR�C�+��<�P�l�aI8*���ef�������I�#k��	���)�c��q��R׌K, yBD/»��p+�(�y��@�'-֛]�uD�9[鹄��6�VVmZ����G��F�˿�����o�Q5���<���V|g�w:O�<W:����Q;��1��)L�I�~���˔�&�O���.)�{ӱU{N�t�Fs�~������|��`8z{�+=9_�Q���9=�Q�Z}�U� �ֺ;sT;�����<E���5&l$�$���I4u!����Op/��Pjd������1�w�E�+O�:��V�@,�t[U�Νu�Թ���V�Vj���i���ހ+��c���5�[���H��;yp��'���Ik+�V��8�f�ꫣ_�ч2m�!*7��9C�"���b�Ȋ�R��
D}#�v����k	�U}+�{�
X�����ah�8V��3�OiIʠh����|	���[r�R�,�<���8֪��(�*�@�&F�1�}Ҽ�.3SWtA�v�6���l�$��EU��N��ό�N�8q��pgfJ��cX���[rA9�(w|�)�����&A��!)�}�·��<�E�/�af�� 
  r��[�Wr��	�<�F>��E�L%��~�p!���[.rQyl��CQUkR�cI�c
�������2��K�c"�z"(���j}�ړK6i�Z�D�S���w]/"�$��Ґ�6�����1������Ȍ�n�ؓdx����`$%q�fU��P�ay�3�G?��_�$�v�kY�SN�3ln�9�����;o��C�K�v~�Q�v)?�l�����"����r�X�
B�i��=�އ�?� ��{3d�n�s%�ݲ��T� �TN�Qi�QRe���*��)�����Hk��v۞�i�N&�ύ��U����ν�4&����]uQ�v�o��{K���Tm��D�;:�_:�� O��q��HT���q�My5r� 4֦��ק�]i�����Q
W����eJ�A�`�5m!�>�;��C�o��A�bG)������+��:�vktr��hcY�bkW�=�m<�wj�h�zh��"�-@Q/u�ݧ<#�����	�/WT�'@I��������4���C�)׭�5M:��� ?|u�O���S�4����ȇSxO�idI��'�'�ȉ��Z���ⱳG��#ryVB;=_�"틹r�R�P�$�5�ܔ�"Uc �-�G���Q]�]>:��C�\De�,�2=�G��D��)ET@�9%F ��E���P"��b�k��O�1�%����--9� u?/<��q���q�5��"���]`�	� Xc^2X�������'X��q)\��B!	�)���'�ÓZ�:0���0j�s-k��
܅�� #^��A�Q(Ʋ0�I�1I�P��Jb�z��!�@M�s~���� jc�ܔ��䛒�ИhB�,���a	�L>9������_��۵r�^��r���A��{ٝ�m'���O��.�"3�Op1>���6��A�)OHxFp��Z5W�r���@�U����&=������	�f^��1j��O�������;�����?%�?�L��/�ߗ�����e��2�}���ϾL_��/�ߗ�_��2�}�����˰>�L�y�:8�qpu��� �r��m2zp7�HMZ��xεB����C�-�NJ������v	~��7��z�ۭ�.��Ѡ���
�}0�������0����'�]�����>�N�
� U�_�������5D�Kͼ����H�T2])���d&O�����J\"���v��6��]w�P���o<xa�)ŵ�+D;�ҕ8y���p\sIiUؼ1\��\��(&a��c8c���˷BY6�-���oc
��SƲ�n���a��a>�	!�7�"Y��~J���c��'1�ӎ��=h��88��(Vxp9�гk�3~�[��F��M�Ӆ`���&����)^��>E��qVD��03�$̢����ޢ��)���f�_��K�hr��MV�X�IO�:4ߚ�q��D����N&�~� KT^��䏹8}�%��<� �Rjaҋ�JRq� ��&��܊���E�m+�{�s��y�M�Cm��qa��9	���<��-cTc@pI��IA��e��Ym��#~����$)�"Z� ��� ��%s�����iٝZ�|�����֣�i��{4R���
�ړ��nO�^�	邯Ga���1
3�U����=��{�´w7�|���6��f���?��IS狿˸���|�.��������4��]��w��e����]��w��e����]��w��e�/�.cc��?���O���?1�yO������'��O���?1�b|������?���=��ZO��Ty�������         �   x���K�� �u8E��F.0�,s����lZIԛ(œUv�L,/���Z� u���@; $Wn�J��'�����PW�O�PF���V����J0Uܰas ����	� ������.pYzc�hA��{t����.��,Fb����ޠX�����YHmh�6��,AV��Ś��Ҵ�ٹ�V�x��"�������n ^�9��m��s�*l�́4�'V��a���T��'�[K)�R���          .  x��R;O�0�/��;"���G�u`l�X�t��FJ��I���Rp�����{�%p���V��s�Ğ�o.��x�x5Cc����Br���?� `�@ĳkk��&my�\�Rc�;�q�髏vx��g��{�m��N'�~��U�BŪ�a/�-;_�q��WM1�(e�ΥR���{ ��E̊h��އ1�c��V�kE�J&ȓ���"��I9�i�'AU.�2�"��H�D��p��u#(�PY޳�D�"��˿���Z����:���.��_����cM;���}�$��;/�4i+	�m-�<˲O����      �     x���=O�0����+�� ����F%
�@EB,%���I��{"&;B�������B3�ط��
y�ӣ3�^�'�������/ ���WׇC���&dE�%q��.3 �mB�����ze8�V�:E �=��RI����� 4[��N�}�>̱�(���)�2 ��MsU�c���B��4���Z,%g ,{<�4���jKU)9M���3 �����s,,�{k���	3 5{��Cz�}a2��h�]�� ����Ns[{T�"�ʱ�+�3覷         c   x�M�1
�0D�z����fFYa��eN��E `I �7���ŃAE,®�j�NE��:�ʀH�����X��뷏���7��������mO߲����k      �   x  x���MO�@��3�#aXড@����Gc� ��P�
V��KӘx�6������|�8�k�"�˧�;��h��AȺ�{Ё��e�ι�9���)��y����p��W%30��%G�%��p�#ʼʄ/�sI�����v3Y=nB�v���VTqW�֢`�tR��?���UB�_oC�d�^^�z���0��T� ��rJný�[�.ʒ*�*�.�����L"3���z�7���7���T��\�T�r�B=*׃Zhn�?v�|<�k,�}n�Q7aA�Mm�TA��-�˴��;{_�����.!�J�.������d΀���_��s"+:�E:��o%'<o���p<[4y4!>,io�-
���.u�x���C�V      �   �   x����j!���{/gtT�5rڲ4=�b�$%�M0��k�-�j�������ק��傡D�(o� ���0��$����pM�1v��%s��nv��D9A�,B�� �C:t}�9&�fs���fb���)�]dH��K��m��6�p�曙 k��T��
��50�ÔO�n1���|�ƾ�Gƕwۗl �Ø���l�r��$�'��D���s!�o)L�sHq�4��ؖi�k�k`��M�}��ׂs��ݜ         J   x���1�@�Nao$|X��,��j�&&S�L�@��^Ղj��)�5w[5��p�#:o@a|�^�a�Eo�     