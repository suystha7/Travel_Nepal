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

  // Initialize empty arrays for each activity
  packageActivities.forEach((activity) => {
    if (activity?.name) {
      menu.ACTIVITIES[activity.name] = [];
    }
  });

  // Assign packages to activities based on category
  packages.forEach((pkg) => {
    const activity = packageActivities.find(
      (a) => a.name === pkg.category?.name
    );
    if (activity?.name) {
      menu.ACTIVITIES[activity.name].push({
        name: pkg.name,
        url: `/package/${pkg.slug}`,
      });
    }
  });

  return menu;
}