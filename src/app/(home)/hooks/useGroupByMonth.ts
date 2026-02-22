import { IPackageRecord } from "@/app/package/interface/IPackageData.interface";
import { useMemo } from "react";

export const usePackagesByMonth = (
  packages: IPackageRecord[] = [],
  selectedMonths: string[] = []
) => {
  return useMemo(() => {
    if (!packages.length) return {};

    const normalizedSelected = selectedMonths.map((m) =>
      m.toLowerCase().trim()
    );

    const grouped = packages.reduce<Record<string, IPackageRecord[]>>(
      (acc, pkg) => {
        const avail =
          (pkg as any).availability_month ??
          (pkg as any).availability_months ??
          [];

        const months = Array.isArray(avail) ? avail : [avail];

        months.forEach((m) => {
          const key = String(m).toLowerCase().trim();
          if (!key) return;

          if (
            normalizedSelected.length > 0 &&
            !normalizedSelected.includes(key)
          ) {
            return;
          }

          if (!acc[key]) {
            acc[key] = [];
          }

          acc[key].push(pkg);
        });

        return acc;
      },
      {}
    );

    return grouped;
  }, [packages, selectedMonths]);
};
