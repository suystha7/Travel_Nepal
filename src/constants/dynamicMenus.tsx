import { IPackageRecord } from "@/app/package/interface/IPackageData.interface";

export function buildDynamicMenu(
  packageActivities: IPackageRecord[],
  packages: IPackageRecord[]
) {
  type MenuEntry = { name: string; url: string };
  type Menu = {
    ACTIVITIES: Record<string, MenuEntry[]>;
  };

  const menu: Menu = { ACTIVITIES: {} };

  const packagesBySlug = packages.reduce(
    (acc, pkg) => {
      const slug = pkg?.package_type;

      if (slug) {
        if (!acc[slug]) acc[slug] = [];
        acc[slug].push({
          name: pkg.name,
          url: `/package/${pkg.slug}`,
        });
      }
      return acc;
    },
    {} as Record<string, MenuEntry[]>
  );

  packageActivities.forEach((activity) => {
    if (activity?.name && activity?.slug) {
      menu.ACTIVITIES[activity.name] = packagesBySlug[activity.slug] || [];
    }
  });

  return menu;
}
