if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) { Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }

Set-Location -Path $PSScriptRoot
#cd $PSScriptRoot

write-host "Do you want to run gltfpack on these files:`n"
Get-ChildItem -Name *.glb
$continue = read-host "`nContinue? Yes(y) or No(n): "

if ($continue -eq 'y' -or $continue -eq 'yes' -or $continue -eq 'YES' -or $continue -eq 'Y') {
$list = Get-ChildItem -Name *.glb

$Folder = '\draco'
$Path = Get-Location

if (Test-Path -Path $Path$Folder) {
    "Running gltfpack"
    
write-host "`n By zrelick@gmail.com`n"
write-host "`n The journey of a thousand miles begins with one step.  Lao Tzu`n"
	
ForEach($n in $list){
	gltfpack -i $n -o $Path$Folder\$n -cc -tc 
	write-host "$n, DONE!"
}

} else {
    "Draco Folder does not exist."
	new-item $Path$Folder -itemtype directory
	write-host "`nSaving files at $Path$Folder"
	
	ForEach($n in $list){
	gltfpack -i $n -o $Path$Folder\$n -cc -tc 
	write-host "$n, DONE!"
}
}
}