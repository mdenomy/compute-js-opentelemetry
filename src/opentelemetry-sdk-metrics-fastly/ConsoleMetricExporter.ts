/*
 * Copyright Fastly, Inc.
 * Licensed under the MIT license. See LICENSE file for details.
 */

import {
  AggregationTemporality,
  DataPointType,
  PushMetricExporter,
  ResourceMetrics
} from "@opentelemetry/sdk-metrics";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";

export class ConsoleMetricExporter implements PushMetricExporter {
  protected _shutdown = true;

  export(metrics: ResourceMetrics, resultCallback: (result: ExportResult) => void) {
    return ConsoleMetricExporter._sendMetrics(metrics, resultCallback);
  }

  getPreferredAggregationTemporality() {
    return AggregationTemporality.CUMULATIVE;
  }

  // nothing to do
  async forceFlush() {}

  async shutdown() {
    this._shutdown = true;
  }

  private static _sendMetrics(
    metrics: ResourceMetrics,
    done: (result: ExportResult) => void
  ): void {
    for (const libraryMetrics of metrics.scopeMetrics) {
      for (const metric of libraryMetrics.metrics) {
        console.log(metric.descriptor);
        console.log(DataPointType[metric.dataPointType]);
        for(const dataPoint of metric.dataPoints) {
          console.log(dataPoint);
        }
      }
    }
    done({ code: ExportResultCode.SUCCESS });
  }

}
