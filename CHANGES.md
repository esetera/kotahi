## Changes

### 2022-07-11

Fields for publishing are now specified in the form-builder, rather than via `HYPOTHESIS_PUBLISH_FIELDS` in the `.env` file. If `HYPOTHESIS_PUBLISH_FIELDS` is not specified, no action is necessary. Otherwise, to retain your existing publishing options, you should:

1. Determine what fields are selected in `HYPOTHESIS_PUBLISH_FIELDS`. Fields are separated by commas, and may consist of either a field name, or a field name and a tag separated by a colon (e.g. `fieldName:hypothesis tag`). You may also have a special `decision` or `reviews` pseudo-field specified. For full details of these old settings, [see here](https://gitlab.coko.foundation/kotahi/kotahi/-/blob/c51b72ec81e74aab915c46f0bdadc3975cc61bd9/FAQ.md#hypothesis).
2. For each ordinary field that was specified in `HYPOTHESIS_PUBLISH_FIELDS`, locate that field in the submission form in the form-builder, and enable "Include when sharing or publishing".
3. If a tag was specified for that field, enter it in the "Hypothes.is tag" text box.
4. If the `decision` pseudo-field was specified, locate the field in your decision form with the internal name "comment": enable "Include when sharing or publishing", and set a hypothes.is tag if one was specified.
5. If the `reviews` pseudo-field was specified, do the same for the review form.
6. You may remove `HYPOTHESIS_PUBLISH_FIELDS` from the `.env` file.

### 2022-04-13

For dev instances, remove the old `minio/minio` image and container:
`docker image rm -f minio/minio`
Then rebuild containers.

### 2022-05-26

- Instances affected: **elife** and **Colab Biophysics** <br />
  `HYPOTHESIS_GROUP=`(this is the Hypothe.is group id) <br />
  `HYPOTHESIS_PUBLISH_FIELDS=`(submission form and endpoint field mapping)

- **Colab Biophysics** Gmail .env variables have been updated.
  ```
  GMAIL_NOTIFICATION_EMAIL_AUTH=
  GMAIL_NOTIFICATION_EMAIL_SENDER=
  GMAIL_NOTIFICATION_PASSWORD=
  ```
