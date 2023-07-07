export default interface ResponseStructure<DataType = null> {
  success: boolean;

  message: string;

  data: DataType;

  error?: any;
}
