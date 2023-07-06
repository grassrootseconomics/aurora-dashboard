export type Certification = {
  id: number;
  key: string | null;
  codeBatch: string;
  dateFingerprint: Date;
  dataFingerprint: string;
  dateSigned: Date | null;
  signedDataFingerprint: string | null;
  signerWallet: string;
  minterWallet: string | null;
  buyerWallet: string | null;
  tokenId: string | null;
};

export type BaseCertification = Omit<
  Certification,
  | 'id'
  | 'key'
  | 'dateSigned'
  | 'signedDataFingerprint'
  | 'minterWallet'
  | 'buyerWallet'
  | 'tokenId'
>;

export type CertificationSignerFields = {
  dataFingerprint: string;
  signedDataFingerprint: string;
  dateSigned: Date;
};

export type CertificationMintFields = {
  minterWallet: string;
  buyerWallet: string;
  tokenId: string;
  certificateKey: string;
};

export type CertificateOwner = {
  id: number;
  certificationKey: string;
  minterWallet: string;
  buyerWallet: string;
  tokenId: string;
};
