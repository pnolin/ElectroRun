import { SegmentDto } from "./segmentDto";

export class RunDto {
  public gameName?: string;
  public runCategory?: string;
  public segments?: SegmentDto[];
}
