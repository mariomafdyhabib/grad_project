{{- define "my-app.fullname" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "frontend.fullname" -}}
{{- printf "%s-frontend" (include "my-app.fullname" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "backend.fullname" -}}
{{- printf "%s-backend" (include "my-app.fullname" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}