import z from 'zod';
import * as _ from 'lodash-es';
import { getFileExtension } from './stringUtils';
import { translate as t } from './translations';
import { MB } from '../constants';


export const vRequired = z
  .string({ required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
  .refine((value) => value.trim() !== '', {
    message: t('validate:VALIDATE.MSG_ERROR_COMMON_005'),
  });


export const vNum = z.preprocess(
  (v) => (v ? String(v) : undefined),
  z
    .string({ required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
    .regex(/^\d+$/, { message: t('validate:VALIDATE.MSG_ERROR_COMMON_006') })
);

export const vAlphabet = z
  .string({ required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
  .regex(/^[a-zA-Z]+$/, {
    message: t('validate:VALIDATE.MSG_ERROR_COMMON_013'),
  });


export const vAlphabetNum = z
  .string({ required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
  .regex(/^[a-zA-Z0-9]+$/, {
    message: t('validate:VALIDATE.MSG_ERROR_COMMON_007'),
  });

export const vHiragana = z
  .string({ required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
  .regex(/^[ぁ-んゔー]+$/, {
    message: t('validate:VALIDATE.MSG_ERROR_COMMON_008'),
  });

export const vKatakana = z
  .string({ required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
  .regex(/^[ァ-ヶー]+$/, {
    message: t('validate:VALIDATE.MSG_ERROR_COMMON_009'),
  });

export const vMin = (min: number) =>
  z
    .string({ required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
    .min(min, {
      message: t('validate:VALIDATE.MSG_ERROR_COMMON_010', { min }),
    });


export const vMax = (max: number) =>
  z
    .string({ required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
    .max(max, {
      message: t('validate:VALIDATE.MSG_ERROR_COMMON_011', { max }),
    });

export const vMinMax = (min: number, max: number) =>
  z
    .string({ required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
    .min(min, {
      message: t('validate:VALIDATE.MSG_ERROR_COMMON_012', { min, max }),
    })
    .max(max, {
      message: t('validate:VALIDATE.MSG_ERROR_COMMON_012', { min, max }),
    });

export const vDate = z
  .string({ required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
  .regex(/^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/, {
    message: t('validate:VALIDATE.MSG_ERROR_COMMON_015'),
  });


export const vTime = z
  .string({ required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
  .regex(/^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: t('validate:VALIDATE.MSG_ERROR_COMMON_016'),
  });


export const vDateTime = z
  .string({ required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
  .regex(
    /^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\s([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
    {
      message: t('validate:VALIDATE.MSG_ERROR_COMMON_017'),
    }
  );


export const vMinRange = (min: number) =>
  z
    .number({
      required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005'),
      invalid_type_error: t('validate:VALIDATE.MSG_ERROR_COMMON_018', { min }),
    })
    .gte(min, {
      message: t('validate:VALIDATE.MSG_ERROR_COMMON_018', { min }),
    });


export const vMaxRange = (max: number) =>
  z
    .number({
      required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005'),
      invalid_type_error: t('validate:VALIDATE.MSG_ERROR_COMMON_019', { max }),
    })
    .lte(max, {
      message: t('validate:VALIDATE.MSG_ERROR_COMMON_019', { max }),
    });


export const vFile = (
  options: {
    required?: boolean;
    validExtensions?: string[];
    maxSize?: number;
    maxCount?: number;
  } = {}
) =>
  z.custom<File[]>().superRefine((arg, ctx) => {
    const {
      validExtensions = ['jpg', 'jpeg'],
      maxSize = 1,
      maxCount = 1,
      required = false,
    } = options;

    const files = arg || [];
    const errors: string[] = [];

    if (files.length < 1 && required) {
      errors.push(t('validate:VALIDATE.MSG_ERROR_COMMON_005'));
    }

    if (files.length > maxCount) {
      errors.push(t('validate:VALIDATE.MSG_ERROR_COMMON_027', { maxCount }));
    }

    const badExtensionFiles = _.filter(files, (file: File) => {
      if (
        _.isEmpty(getFileExtension(file.name)) &&
        !_.includes(errors, t('validate:VALIDATE.MSG_ERROR_COMMON_024'))
      ) {
        errors.push(t('validate:VALIDATE.MSG_ERROR_COMMON_024'));
      }

      return !validExtensions.includes(getFileExtension(file.name));
    });

    if (validExtensions.length > 0 && badExtensionFiles.length > 0) {
      errors.push(
        t('validate:VALIDATE.MSG_ERROR_COMMON_020', {
          fileExtensions: validExtensions.join(','),
        })
      );
    }

    const tooBigFiles = _.filter(
      files,
      (file: File) => file.size > maxSize * MB
    );
    if (tooBigFiles.length > 0) {
      errors.push(t('validate:VALIDATE.MSG_ERROR_COMMON_026', { maxSize }));
    }

    if (errors.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errors.join('\n'),
      });
    }
  });


export const vEmail = z
  .string({ required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
  .regex(
    /^([a-zA-Z0-9])+([.+a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+$/,
    {
      message: t('validate:VALIDATE.MSG_ERROR_COMMON_021'),
    }
  );

export const vXCharOnly = (len: number) =>
  z
    .string({ required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
    .refine(
      (arg) => {
        const argNoSpace = arg.replace(/\s/g, '');
        if (argNoSpace.length !== arg.length) {
          return false;
        }

        return argNoSpace.length === len;
      },
      {
        message: t('validate:VALIDATE.MSG_ERROR_COMMON_022', { len }),
      }
    );


export const vKanaAlphabetNum = z
  .string({ required_error: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
  .regex(/[ァ-ヶーa-zA-Z0-9]+/g, {
    message: t('validate:VALIDATE.MSG_ERROR_COMMON_023'),
  });


export const getValidationErrors = (
  validators: Array<
    | z.ZodString
    | z.ZodNumber
    | z.ZodDate
    | z.ZodEffects<z.ZodString, string, unknown>
  >,
  value: string | number | Date
): string => {
  const errorMessages: string[] = [];

  validators.forEach((validator) => {
    const result = validator.safeParse(value);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errorMessages.push(issue.message);
      });
    }
  });

  // "Expected xxxx, received null"
  const outputMessages = _.map(_.uniq(errorMessages), (message) =>
    _.replace(
      message,
      /Expected \S+, received null/,
      t('validate:VALIDATE.MSG_ERROR_COMMON_005')
    )
  );

  return _.uniq(outputMessages).join('\n');
};

export const vFileFolderName = z
  .string()
  .trim()
  .min(1, { message: t('validate:VALIDATE.MSG_ERROR_COMMON_005') })
  .max(255, {
    message: t('validate:VALIDATE.MSG_ERROR_COMMON_011', {
      max: 255,
    }),
  })
  .regex(/^[^<>:"/\\|?*]+$/, { message: '禁止文字が含まれています' }); // 禁止文字(<, >, :, ", /, \, |, ?, *)
