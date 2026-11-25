// Map data for /about, built on the server and cached for 6 h (the old repo fetched it at build time),
// so the browser loads ~30 KB from this site instead of 5.7 MB from the API.
export const dynamic = "force-static";
export const revalidate = 21600;

export type FormapPoint = [name: string, latitude: number, longitude: number];

type FormapRepository = {
  name?: string;
  dataProviderLocation?: {
    latitude?: number | null;
    longitude?: number | null;
  } | null;
};

export const GET = async () => {
  try {
    const response = await fetch(
      "https://api.core.ac.uk/internal/repositories/formap",
    );
    const repositories = (await response.json()) as FormapRepository[];

    const points: FormapPoint[] = repositories
      .filter(
        ({ name, dataProviderLocation: l }) =>
          name && l?.latitude != null && l.longitude != null,
      )
      .slice(0, 501) // the old map stopped at 501 ("too long map load")
      .map(({ name, dataProviderLocation: l }) => [
        name!,
        l!.latitude!,
        l!.longitude!,
      ]);

    return Response.json(points);
  } catch {
    return Response.json([]); // the map still renders, without markers
  }
};
