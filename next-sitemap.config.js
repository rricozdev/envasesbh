/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.envasesbh.mx',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (path.startsWith('/productos/')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path === '/productos') {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path === '/promociones') {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path === '/servicios' || path === '/proyectos-a-tu-medida') {
      priority = 0.8;
    } else if (path.startsWith('/blog/')) {
      priority = 0.6;
      changefreq = 'monthly';
    } else if (path === '/contacto') {
      priority = 0.7;
    } else if (path === '/quienes-somos') {
      priority = 0.6;
    } else if (path === '/legal/privacidad') {
      priority = 0.3;
      changefreq = 'yearly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
}