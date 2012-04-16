<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'seedorf_wordpress5');

/** MySQL database username */
define('DB_USER', 'seedorf_wordpr5');

/** MySQL database password */
define('DB_PASSWORD', 'JVgtX,,uUQ');

/** MySQL hostname */
define('DB_HOST', 'mydb17.surftown.dk');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '|Y!mA.R!301l+hEg}!.BvUB jcZE($1*z:zBM@Md-6|f-@g!_wcF?.t|A3(O*ZQB');
define('SECURE_AUTH_KEY',  'FPo+$nJ^6y4B*uZQ^q`sLwU5m)UEDgxQ$~vy-/RO}x+KANxv%(ei?oKqiaXyL0o.');
define('LOGGED_IN_KEY',    '=OlCq[=r4vhphmNr2j*%E+D==M8SK_:*7^$iA@p/Gf$C9}M%?,M^5lw++MM5>p_o');
define('NONCE_KEY',        '~($rh sT;Rp,m|8kArx+oR(2/a19r6/[>VR6JCU/b7tP9pp<+6!<;ce|*d<~9P`G');
define('AUTH_SALT',        '#O?VA[KjcQ)jWw#c7[NC*^,=q&PW@.|&|*X|X/e?;:q ycy.B7%rGoPk6[-K^W$3');
define('SECURE_AUTH_SALT', 'eOvF[~7OYw8l^cmwQ}f&-f.lNOlFj{:aELw1+NyEix/(klA>+*IeH,$t[%>|[PCg');
define('LOGGED_IN_SALT',   'tJxhT)C+qQfTzl+-qwJy5T.@B5M3p[0r$|u4jqww0P= h[KY ^N&&mNc-Pw Hzh{');
define('NONCE_SALT',       ']GF7d}-,q?(]j$-(r[>d-0 i%]6^7+q]Iy!NI{*YN|@>,poD@CAj+!||a,n;#f.;');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
