from django.db import models

# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=30, unique=True)
    content = models.TextField()
    date_added = models.DateField(auto_now=True)

class Comment(models.Model):
    username = models.CharField(max_length=20)
    comment_data = models.CharField(max_length=100)
    date_added = models.DateTimeField(auto_now=True)
    reply_id = models.ForeignKey("self", null=True, on_delete=models.CASCADE)
    blog_id = models.ForeignKey(Blog, on_delete=models.CASCADE)
