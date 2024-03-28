export class EmailContent {
  public constructor(
    public senderName: string,
    public senderEmail: string,
    public receiverEmail: string,
    public message: string
  ) {}

  public static emptyEmailContent(): EmailContent {
    return new EmailContent('', '', '', '');
  }
}
