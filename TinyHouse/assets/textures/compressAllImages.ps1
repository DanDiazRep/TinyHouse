if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) { Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }

Set-Location -Path $PSScriptRoot
#cd $PSScriptRoot

write-host "Do you want to run toktx on these files:`n"
$list = Get-ChildItem -Name *.jpg , *.png
#Show items
$list
#Ask user to continue or cancel
$continue = read-host "`nContinue? Yes(y) or No(n): "

if ($continue -eq 'y' -or $continue -eq 'yes' -or $continue -eq 'YES' -or $continue -eq 'Y') {

$Folder = '\ktx'
$Path = Get-Location

if (Test-Path -Path $Path$Folder) {    
    write-host "`n Script by zrelick@gmail.com"
    write-host "`n The journey of a thousand miles begins with one step.  Lao Tzu`n"
    write-host " Running toktx...`n"
	
ForEach($n in $list){
    $output = "$Path$Folder\$n" -replace ".png" , ""
    $output = $output -replace ".jpg" , ""
	toktx  --bcmp  --assign_primaries srgb  --assign_oetf srgb --genmipmap  --upper_left_maps_to_s0t0 $output $n      
	write-host "* $n, DONE!"
}

} else {
    "Ktx Folder does not exist."
	new-item $Path$Folder -itemtype directory
	write-host "`nSaving files at $Path$Folder"
	
	ForEach($n in $list){
	#gltfpack -i $n -o $Path$Folder\$n -cc -tc     
	write-host "$n, DONE!"
}
}

}