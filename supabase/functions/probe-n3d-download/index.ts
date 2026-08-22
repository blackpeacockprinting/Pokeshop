// Retired. Was a temporary probe to find N3D's download endpoint shape
// (16 Aug 2026). The real endpoint is now known and used by
// download-ams-proxy. Safe to delete from the Supabase dashboard.
Deno.serve(() => Response.json({ retired: true }));
