interface APIError {
  error: string;
  code: number;
}
interface Source {
  name: string;
  parent: string;
  display_name: string;
  write_keys: string[];
  library_config: SourceLibraryConfig;
  labels: Record<string, string>;
  id: string;
  function_config: any[];
  create_time: string;
  catalog_name: string;
}
interface SourceLibraryConfig {
  metrics_enabled: boolean;
  retry_queue: boolean;
  cross_domain_id_enabled: boolean;
  api_host: string;
}
