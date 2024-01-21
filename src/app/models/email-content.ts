export class EmailContent {
  public constructor(
    public yourName: string,
    public emailRecipient: string,
    public emailBody: string
  ) {}

  public static emptyEmailContent(): EmailContent {
    return new EmailContent('', '', '');
  }
}
