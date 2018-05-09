Attribute VB_Name = "NewMacros"
Sub Макрос5()
Selection.WholeStory
Selection.Find.ClearFormatting
Selection.Find.Replacement.ClearFormatting
With Selection.Find
.Text = " {1;}([.,:;\!\?])"
.Replacement.Text = "\1"
.Forward = True
.Wrap = wdFindContinue
.Format = False
.MatchCase = False
.MatchWholeWord = False
.MatchAllWordForms = False
.MatchSoundsLike = False
.MatchWildcards = True
End With
Selection.Find.Execute Replace:=wdReplaceAll
Selection.MoveLeft Unit:=wdCharacter, Count:=1

With Selection.Find
.Text = " {2;}"
.Replacement.Text = " "
.Forward = True
.Wrap = wdFindAsk
.Format = False
.MatchCase = False
.MatchWholeWord = False
.MatchAllWordForms = False
.MatchSoundsLike = False
.MatchWildcards = True
End With
Selection.Find.Execute Replace:=wdReplaceAll
Selection.MoveRight Unit:=wdCharacter, Count:=1
End Sub
