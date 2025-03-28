import { JWK, JWTPayload } from "jose";

interface VCFormat {
  alg: string[];
}
interface LinkedDataFormat {
  proof_type: string[];
}

// https://identity.foundation/claim-format-registry/#registry
interface VCFormats {
  "vc+sd-jwt"?: VCFormat;
  jwt_vc?: VCFormat;
  jwt_vc_json?: VCFormat;
  ldp_vc?: LinkedDataFormat;
}

// https://identity.foundation/presentation-exchange/#input-descriptor-2
export interface InputDescriptor {
  id: string;
  name?: string;
  purpose?: string;
  format?: VCFormats;
  constraints: any;
  group?: string[];
  [key: string]: any;
}

export interface DescriptorMap {
  id: string;
  format: string;
  path: string;
  pathNested?: Omit<DescriptorMap, "id">;
}

export interface SubmissionRequirement {
  name: string;
  count: number;
  rule: string;
  from: string;
}

export interface PresentationDefinition {
  id: string;
  inputDescriptors: InputDescriptor[];
  submissionRequirements: any[];
}

export interface PresentationSubmission {
  id: string;
  definitionId: string;
  descriptorMap: DescriptorMap[];
}

export interface VerifiableCredential<T> {
  vc: VerifiableCredentialPayload<T>;
}

export interface VerifiableCredentialPayload<T> {
  "@context": string[];
  type: string[];
  credentialSubject: T;
}

export interface VerifiablePresentationJWTPayload<T = any> extends JWTPayload {
  nonce: string;
  vp: {
    "@context": string[];
    type: string[];
    verifiableCredential: T[];
    id?: string;
    holder?: string;
    proof?: any;
  };
}

/**
 * @deprecated
 */
export interface VerifiablePresentationPayload<T> {
  "@context": string[];
  type: string[];
  verifiableCredential: T[];
  id?: string;
  holder?: string;
  proof?: any;
}

/**
 * @deprecated
 */
export interface DecodedVcJwt<T> {
  vc: VerifiableCredentialPayload<T>;
}

/**
 * @deprecated
 */
export interface DecodedVpJwt {
  vp: VerifiablePresentationPayload<string>;
}

type Scope =
  | "openid"
  | "openid did_authn"
  | "profile"
  | "email"
  | "address"
  | "phone"
  | "offline_access";
type SubjectType = "public" | "pairwise";
type SigningAlgo = "EdDSA" | "RS256" | "PS256" | "ES256" | "ES256K";
/*
{
  "vp_formats": {
    "vc+sd-jwt": {
      "sd-jwt_alg_values": ["ES256", "ES384"],
      "kb-jwt_alg_values": ["ES256", "ES384"]
    },
    "jwt_vp": {
       "alg": [
          "EdDSA",
          "ES256K"
       ]
    },
    "ldp_vp": {
       "proof_type": [
          "Ed25519Signature2018"
       ]
    }
  }
}
* */
type Format =
  | "jwt"
  | "jwt_vc"
  | "jwt_vc_json"
  | "jwt_vp"
  | "ldp"
  | "ldp_vc"
  | "ldp_vp";
// type VpFormatKey = "jwt_vp" | "ldp_vp" | "vc+sd-jwt";
type VpFormats = {
  "vc+sd-jwt"?: {
    "sd-jwt_alg_values": SigningAlgo[];
    "kb-jwt_alg_values": SigningAlgo[];
  };
  jwt_vp?: {
    alg: SigningAlgo[];
  };
  ldp_vp?: {
    proof_type: string[];
  };
};

export const VC_FORMAT_ALG = ["ES256"];

export const VC_FORMAT_VC_SD_JWT = {
  "vc+sd-jwt": {
    alg: VC_FORMAT_ALG,
  },
};

export const VC_FORMAT_JWT_VC = {
  jwt_vc: {
    alg: VC_FORMAT_ALG,
  },
};

export const VC_FORMAT_JWT_VC_JSON = {
  jwt_vc_json: {
    alg: VC_FORMAT_ALG,
  },
};

export interface ClientMetadata {
  scopesSupported?: Scope[];
  subjectTypesSupported?: SubjectType[];
  idTokenSigningAlgValuesSupported?: SigningAlgo[];
  requestObjectSigningAlgValuesSupported?: SigningAlgo[];
  subjectSyntaxTypesSupported?: string[];
  requestObjectSigningAlg?: SigningAlgo;
  requestObjectEncryptionAlgValuesSupported?: SigningAlgo[];
  requestObjectEncryptionEncValuesSupported?: string[];
  clientId?: string;
  clientName?: string;
  vpFormats?: VpFormats;
  // vpFormats?: { [key: string]: { [key: string]: string[] } };
  logoUri?: string;
  policyUri?: string;
  tosUri?: string;
  clientPurpose?: string;
  jwks?: string; // todo change to set
  jwksUri?: string;
  vpFormatsSupported?: Format;
  redirectUris?: string[];
}

export interface PublicKeySetting {
  skipVerifyChain?: boolean;
  secret?: Uint8Array;
}

export interface NotFoundError {
  type: "NOT_FOUND";
  subject: string;
  identifier?: string;
}

export interface ExpiredError {
  type: "EXPIRED";
  subject: string;
  identifier?: string;
}

export interface ConsumedError {
  type: "CONSUMED";
  subject: string;
  identifier?: string;
}

export interface UnexpectedError {
  type: "UNEXPECTED_ERROR";
  cause?: Error | unknown;
}
