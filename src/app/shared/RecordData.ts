import { Input, Output } from "@angular/core";
import Symptom from "./Symptom";

@Input() @Output() class RecordData{
  @Input() @Output() name: string = "";
  @Input() @Output() location : string = "";
  @Input() @Output() localStateProv : string = "";
  @Input() @Output() symptoms : Symptom[] = [];
  @Input() @Output() otherSymptoms : Symptom[] = [];
  @Input() @Output() id : string = "";
}

export default RecordData;
